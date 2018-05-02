package org.genboard.patterns;

public class DPattern {
    
    public static final String EMAIL_MSG = "{invalid.email}";
    public static final String EMAIL_REGEXP = 
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
            +"[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"
            +"(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)"
            + "+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    
    public static final String MOBILE_PHONE_MSG = "{invalid.mobilephone}";
    public static final String MOBILE_PHONE_REGEXP = 
    		"^\\+?(\\d{2})[- ]?(\\d{1})[- ]?(\\d{2})[- ]?(\\d{4})[- ]?(\\d{4})$";
    
    
    public static final String HOME_PHONE_MSG = "{invalid.homephone}";
    public static final String HOME_PHONE_REGEXP = 
    		"^\\+?(\\d{2})[- ]?(\\d{1})[- ]?(\\d{2})[- ]?(\\d{4})[- ]?(\\d{4})$";
    
    
    public static final String ADDRESS_MSG = "{invalid.address}";
    public static final String ADDRESS_REGEXP = 
            "^([\\S. ]* )?([a-zA-Z]{3,}) ([\\S. ]* )?([0-9]+)( [\\S. ]*)?";

    public static final String VERSION_MSG = "{invalid.version}";
    public static final String VERSION_REGEXP = 
            "^(\\d{1,3})((\\.[a-zA-Z0-9]{1,3}){0,2})?(\\.([abc]|alpha|betha))?$";
    
}
