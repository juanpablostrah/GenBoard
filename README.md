# GenBoard
tablero generico para juegos de rol.

![GitHub Logo](/logo/dice.png)

Proyecto para TIP de la UNQ, de Juan Pablo Strah y Loiacono Pablo, que consiste en un tablero que permite a jugadores de juegos de rol, poder jugar de manera online sin necesidad de tener que reunirse todos en un mismo sitio. Esta Necesidad surgio a traves de un amigo que posee una casa de videojuegos y organiza partidas de rol, y siempre se encontraba con la dificultad de juntar a todos los jugadores en un mismo lugar a causa de la distancias en las que vivian. Con esta aplicacion se busca solucionar esta dificultad y permitir a los jugadores poder jugar desde sus casas.

![Wiki del proyecto](https://github.com/juanpablostrah/GenBoard/wiki)


### development

Ejecutar docker-compose developer
> docker-compose -f docker-compose-dev.yml build    
> docker-compose -f docker-compose-dev.yml up    

### mysql    

Conectarse al container docker    
> docker exec -i -t genboard-mysql /bin/bash   

Iniciar sesion mysql dentro del contenedor    
> mysql --host=localhost --user=root --password=$MYSQL_ROOT_PASSWORD

Iniciar una sesion mysql a travez de la red virtual (solicitará password)
> mysql --host=172.30.0.21 --user=root -p    

Verificar datos de pueba

> USE dockerdb;    
> SHOW TABLES;    

### www    

La aplicación frontend web está desarrollada en Angular.    
El entorno de desarrollo es un ambiente node.js.
Para el ambiente de desarrollo se usa una imagen `node:6` con el filesystem
asociado al directorio del código fuente, al ejecutar `node install` las
dependencias se persistirán en el host, evitando demoras en futuras construcciones.   
Esta estrategia permite conectarse al *container* y ejecutar la aplicación a demanda.

Conectarse al container docker    
> docker exec -i -t genboard-www-dev /bin/bash    

Instalar dependencias en modo desarrollo  
> npm install     

Ejecutar aplicaciónes API/SPA en modo desarrollo  
> npm start     

Empaquetar aplicación  
> npm run build     

### api    

El servidor de datos es una aplicación Java
TODO: completar
