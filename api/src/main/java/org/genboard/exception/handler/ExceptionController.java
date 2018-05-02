package org.genboard.exception.handler;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.genboard.exception.CustomRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ExceptionController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionController.class);
    

    @ExceptionHandler(IllegalStateException.class)
    @ResponseBody
    public Map<String,String> errorResponse(IllegalStateException ex, HttpServletResponse response){
        LOGGER.error("Handling IllegalStateException", ex);
        Throwable cause = ex.getCause();
        Map<String,String> errorMap = new HashMap<String,String>();
            if(cause instanceof InvocationTargetException){
                InvocationTargetException castCause = (InvocationTargetException) cause;
                Throwable target = castCause.getTargetException();
                if(target instanceof CustomRuntimeException){
                	CustomRuntimeException marketEx = (CustomRuntimeException) target;
                    errorMap.put("msg", marketEx.getMessage());
                    errorMap.put("key", marketEx.getKeyError());
                    String params = marketEx.getJsonParams();
                    if(params != null){
                        errorMap.put("params", params);
                    }
                    response.setStatus(HttpStatus.BAD_REQUEST.value());
                    return errorMap;
                }
            }
        errorMap.put("msg", ex.getMessage());
        errorMap.put("key", "unexpectedError");
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return errorMap;
    }
    
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Map<String,String> errorResponse(Exception ex, HttpServletResponse response){
        LOGGER.error("Handling Exception", ex);
        Map<String,String> errorMap = new HashMap<String,String>();
        errorMap.put("msg", ex.getMessage());
        errorMap.put("key", "unexpectedError");
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return errorMap;
    }
    
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    public Map<String,String> errorResponse(ConstraintViolationException ex, HttpServletResponse response){
        LOGGER.error("Handling ConstraintViolationException", ex);
        Map<String,String> errorMap = new HashMap<String,String>();
        errorMap.put("msg", ex.getMessage());
        errorMap.put("key", "validationErrors");
        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        List<String> validationErrors = new LinkedList<String>();
        for (ConstraintViolation<?> constraintViolation : constraintViolations) {
           validationErrors.add(constraintViolation.getMessage());
        }
        String imploded = String.join(",", validationErrors);
        errorMap.put("validationErrors", imploded);
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        return errorMap;
    }
    
    @ExceptionHandler(CustomRuntimeException.class)
    @ResponseBody
    public Map<String,String> errorResponse(CustomRuntimeException ex, HttpServletResponse response){
        Map<String,String> errorMap = new HashMap<String,String>();
        errorMap.put("msg", ex.getMessage());
        errorMap.put("key", ex.getKeyError());
        String params = ex.getJsonParams();
        if(params != null){
            errorMap.put("params", params);
        }
        
        LOGGER.error("Handling MarketRuntimeException" + errorMap);
        LOGGER.debug("Handling MarketRuntimeException", ex);
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        return errorMap;
    }
    
    

}