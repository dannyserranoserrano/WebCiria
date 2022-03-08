<h1><b>keD@MOS???</b></h1>
<h2><b></b>Descripción del proyecto.</b></h2>
<p> *En este proyecto intento abarcar diferentes aplicaciones, todas unidas en un espacio comun donde cualquier
    usuario sin necesidad de login pueda acceder y consultar la información principal y su galería de imágenes y
    videos, pero que contenga mucho más una vez logueado.</p>
<p> *La primera aplicación consistirá en un espacio donde los usuarios logueados podrán crear nuevos eventos puntuales
    para que quien lo desee pueda inscribirse y participar. En él, podran decidir el tipo de actividad a realizar,
    desde una ruta senderista, paseo en bici, comidas o cenas populares, etc. En dicho evento, se podran introducir
    imágenes que despues se visualizarán, por ejemplo si se realiza de nuevo esa ruta como información, o si se
    desea visualizar en un futuro a modo de album multimedia.
    El usuario receptor recibirá el aviso del nuevo evento para poder inscribirse, previamente debería haberse suscrito
    a las notificaciones. En caso de que dicha actividad fuese de pago, que pueda
    realizarlo mediante un sistema como tarjeta, bizum, etc.</p>
<h2><b>Relación entre Modelos.</b></H2>
<img src="/images/Relación entre modelos.jpg" style="width: 800px;" alt="relacion entre modelos">
<h2><b>Esquema estructural de la web</b></H2>
<img src="/images/Diagrama_Proyecto3.png" style="width: 800px;" alt="relacion entre modelos">
<h2>Tecnologias empleadas</h2>
<img src="/images/" alt="relacion entre modelos">

<h2>Caracteristicas de la Aplicación.</h2>

<h3> -Sistema de <b> inicio de sesión / registro:</b></h3>
<p> *Espacio en el cual si no estas registrado podrás realizar tu registro
    introduciendo <b>nombre completo, clave, ciudad de residencia, email y teléfono.</b> El email y la clave serás
    los
    datos de logueo para el usuario. Si ya estás registrado,
    introducirás el <b>correo y contraseña</b>, ello te llevará a la siguente pantalla que dependerá de si eres
    usuario o
    administrador.</p>
<h3> -Panel de usuario / administrador</h3>

<h4> <b>--Panel de usuario:</b></h4>
<p> *Podrá seleccionar la entrada a la <b>zona de eventos</b>, visitar la
    <b>zona
        multimedia</b>, entrar en tu <b> perfil de usuario</b> y editar Ciudad, Telefono y la Clave. También
    podrás
    ponerte una <b>imágen de perfil</b>.</p>

<p> *En la <b> Zona de eventos </b> se mostrarán todos los <b> eventos activados </b> y se podrá seleccionar
    el
    que desee para <b> inscribirse</b>, en el cual se hará el <b>pago </b>en caso de tener coste, <b>
        activar
        nuevos
        eventos </b>
    para que
    otros usuarios puedan
    inscribirse y <b>consultar los eventos pasados</b>. El sistema de eventos <b>desactivará cada evento
    </b>que
    halla caducado en
    fecha, pero se conservarán sus datos para poder ser consultados.</p>
<p> *El evento contendrá el <b>precio</b> en caso de que tenga, la <b>fecha y hora </b>de su realización, el
    <b>tipo de evento </b>que se quiere celebrar,
    la <b>descripción</b>
    del mismo y archivos <b>multimedia</b> que se hallan insertado en el sistema y estén relacionados con
    ello
    mediante etiquetas.</p>

<p> *El Modelo de archivos <b>multimedia</b> incluirán el nombre del archivo, la <b>descripcion</b> del
    mismo,
    <b>Fecha</b> de creación, y el <b>usuario</b> que lo ha introducido.</p>

<p> *El modelo de <b>tipo de actividad</b> contendrá el <b>nombre de actividad</b> como por ejemplo marcha
    senderista, ruta en bici, comidas o cenas populares, partidos de frontón, misas, etc, es decir,
    diferentes
    actividades predefinidas, así como su precio en caso de que tuviese un coste.</p>
<p> *El modelo de <b>Pago</b> contendrá los modos de pago guardados por el usuario, así como el nombre de
    usuario.</p>



<h4><b>--Panel de administrador:</b></h4>
<p> *Contendrá los mismos elementos que el Panel de usuario, pero con opciones
    añadidas como la <b>Gestión y creación</b> de nuevos eventos, <b>Gestión y borrado</b> de archivos
    insertados por los usuarios o gestión de usuarios</p>

<h3>
    <b>Reparto de archivos en carpetas:
    </b></h3>

<p>CARPETA <b>API:</b> En dicha carpeta se almacenan todos los archivos JSON referentes a las rutas de
    los
    modelos, que serán
    las encargadas de crear los enlaces a las diferentes funciones.</p>

<p><b>UserRouter:</b> Este archivo contiene las rutas para crear un nuevo usuario, visualizar
    todos
    los usuarios, visualizar un solo usuario, modificar los datos de usuario, borrar un usuario
    o
    loguearte para entrar en la aplicación.
</p>
<p><b>Crear</b> nuevo usuario <b>.post(/users):</b> Este enlace nos permite introducir nuestros
    datos
    para poder registrarnos y acceder a mas opciones. Para realizar esto no es necesario
    tener <b>ningun permiso</b> en especial, se realiza desde la página principal,
    introduciendo
    Nombre y apellido, correo electrónico, ciudad de residencia y contraseña. </p>
<p><b>Modificar</b> los datos de usuario <b>.put(/updateUser/:id):</b> Desde aqui podremos
    modificar
    nuestros datos no esenciales tales como <b>Nombre, Apellido y Ciudad</b> de
    residencia.
    El
    correo electrónico no se podra modificar ya que es éste quien nos otorga el usuario.
    La
    opción de modificar datos unicamente se podrá realizar si previamente te has
    <b>logueado</b>
    como
    usuario en la
    cuenta.</p>
<p><b>Borrar</b> cuenta de usuario <b>.delete(/deleteUser/:id):</b> Desde aqui podremos
    eliminar
    nuestra
    cuenta
    con todos nuestros datos datos. Para ello tendremos que estar <b>logueados</b> como
    usuario.
</p>
<p><b>Visualizar todos</b> los usuarios <b>.get(/users):</b> Desde esta ruta podremos
    visualizar
    la
    lista
    de usuarios registrados en el sistema. Esta ruta es exclusica del
    <b>administrador</b>,
    por
    ello
    tendremos que habernos logueado como tal para realizar dicha operación.</p>
<p><b>Visualizar un usuario .get(/findUser/:id):</b> Desde esta ruta podremos visualizar
    todos
    nuestro datos registrados. Para ello necesitas haberte <b>logueado</b> como usuario
    previamente.
</p>
<p><b>Loguearte</b> como usuario/administrador <b>.post(/login):</b> Este es el paso previo
    para
    poder
    acceder. Aquí introduciremos nuestro correo electrónico y password y nos dará la
    posibilidad
    de realizar las funciones principales de la aplicación. al igual que el registro se
    realiza
    desde la página principal <b>sin haber realizado</b> ningun paso previo.</p>


<p><b>ReserveRouter:</b> En este archivo tenemos las rutas para crear reservas, añadirnos como
    participantes de de un evento, visualizar todos los datos o uno en especifico, o borrar la
    reserva.
</p>
<p><b>Crear</b> nueva reserva <b>.post(/newReserve/:eventId):</b> Desde aqui crearemos una
    nueva
    reserva e
    inscribiremos al primer participante, para despues, que se puedan ir inscribiendo
    nuevos
    participantes. Para ello deberemos insertar el evento al que va relacionado así como
    el
    primer participante que lo realizará. Para todo ello debemos habernos inscrito y
    <b>logueado</b> en
    el sistema como usuario.</p>
<p><b>Borrar</b> una reserva <b>.delete(/deleteReserve/:id):</b> Con esta ruta podremos borra
    una
    reserva.
    Para
    ello necesitamos ser <b>administrador</b> del sistema y estar logueados.</p>
<p><b>Visualizar todas</b> las reservas <b>.get(/reserves):</b> Aqui se podrán revisar todas
    las
    reservas
    creadas. Para ello deberás ser <b>administrador</b> y estar logueado en el sistema.
</p>
<p><b>Visualizar una reserva .get(/findReserve/:id):</b> quí podremos visualizar la reserva
    en
    la
    que estoy inscrito. Para ello deberemos estar <b>logueados</b> en el sistema.</p>

<p><b>PaymentRouter:</b> Este archivo contiene el sistema de pago *****FALTA CONCRETAR*****.
</p>
<p>
    <b>FileRouter:</b> En este archivo se encuentran las rutas para insertar imágenes asociadas
    a un
    evento, tambien podremos modificar, borrar, o visualizar dichas imágenes.
</p>
<p><b>Crear</b> o subir un nuevo archivo <b>.post(/newFile):</b> Desde aquí podremos subir
    imágenes
    a
    nuestro servidor, para ello además de seleccionar el archivo desde nuestras
    carpetas,
    necesitaremos añadir <b>Nombre</b> del archivo, <b>Descripción</b> de la imágen,
    <b>Fecha</b> de la obtención de la imagen, <b>Usuario</b> que la ha realizado y
    <b>Evento</b> al que pertenece. Para realizar esto debemos estar <b>logueados</b>
    como
    usuarios.
</p>
<p><b>Modificar</b> datos del archivo <b>.put(/updateFile/:id):</b> Aquí podremos modificar
    datos
    insertados en el archivo tales como el <b>nombre</b> del archivo, la
    <b>descripción</b>
    de
    la imagen o la <b>fecha</b> de la toma de la imagen. Esto lo podrá realizar el
    usuario
    registrado y <b>logueado</b> que ha proporcionado dicha imagen.</p>
<p><b>Borrar</b> un archivo <b>.delete(/deleteFile/:id):</b> Con esta ruta se puede borrar el
    archivo
    que
    deseemos. Esto solo puede realizarlo el <b>administrador</b> estando logueado.</p>
<p><b>Visualizar todos</b> los archivos subidos <b>.get(/files):</b> Desde aqui podremos
    visualizar
    las
    imágenes que los <b>usuarios</b> han subido al servidor. Para ello <b>no es
        necesario</b> estar logueado.</p>
<p><b>Visualizar un archivo</b> subido al servidor <b>.get(/findFiles/:id):</b> Al igual que
    con
    el
    anterior apartado, desde aquí podrás visualizar <b>un solo archivo</b>, y para ello
    <b>no es
        necesario</b> estar logueado.</p>

<p>
    <b>EventRouter:</b> Aqui tenemos las rutas para crear, modificar, borrar o visualizar los
    eventos
    que se van a celebrar.
</p>
<p><b>Crear</b> un evento <b>.post(/newEvent):</b> Con esta ruta podremos crear un evento
    rellenando
    una
    serie de campos como el <b>Tipo de actividad</b> que vamos a realizar, la
    <b>Descripción</b>
    del evento a realizar, el <b>Precio</b> del evento en caso de que sea de pago, el
    <b>Usuario</b> que ha creado el evento, y la <b>fecha de la actividad</b> a
    realizar.
    Para
    poder realizar esto, deberas estar <b>logueado</b> como usuario.
</p>
<p>
    <b>Modificar</b> los datos de un evento <b>.put(/updateEvent/:id):</b> Desde esta ruta se
    podrán
    <b>modificar</b> los datos del evento tales como la <b>Actividad</b> a realizar, la
    <b>Descripción</b>, del evento, el <b>Precio</b> en caso de tenerlo, el
    <b>Usuario</b>
    que
    lo ha creado y la <b>Fecha del evento</b>. Para ello debemos estar registrados y
    <b>logueados</b> en la aplicación.
</p>
<p>
    <b>Borrar</b> un evento creado <b>.delete(/deleteEvent/:id):</b> Con esto podemos
    <b>borrar</b> un
    evento
    ya creado, para ello debes estar logueado y ser <b>administrador</b> de la
    aplicación.
</p>
<p>
    <b>Visualizar</b> todos los eventos <b>.get(/events):</b> Se podrán visualizar todos los
    eventos
    que
    estén programados, para que así el que lo desee pueda inscribirse. Para ello <b>no
        es
        necesario</b> estar logueado.
</p>
<p>
    <b>Visualizar un evento</b> ya creado <b>.get(/findEvent/:id):</b> También podrá
    visualizarse
    un
    evento
    concreto, y al igual que la anterior ruta, <b>no es necesario</b> estar logueado.
</p>

<p>
    <b>ActivityRouter:</b> En este archivo están las rutas para crear, modificar, borrar y
    visualizar
    las actividades genéricas que se podrán realizar.</p>

<p><b>Crear</b> una nueva actividad <b>.post(/newActivity):</b> Aquí podremos crear una nueva
    actividad
    que
    mas tarde utilizaremos para definir los eventos. En ella deberemos rellenar los
    siguientes
    campos: <b>Nombre de la actividad, si es de pago o no lo es.</b> Para realizar esta
    acción
    debes ser
    <b>Administrador</b> de la aplicación.</p>
<p><b>Modificar</b> los datos de una actividad ya creada <b>.put(/updateActivity/:id):</b> Con
    esto
    puedes
    modificar la actividad creada previamente con los campos Nombre de la actividad y si
    es
    de
    pago o no lo es. Para realizar la operación debes ser <b>Administrador</b>y estar
    logueado.
</p>
<p>
    <b>Borrar</b> una actividad previamente creada <b>.delete(/deleteActivity/:id):</b> Ruta
    para
    eliminar
    una
    actividad creada. Para realizarlo, tienes que ser <b>Administrador</b> y estar
    logueado.
</p>
<p>
    <b>Visualizar</b> todas las actividades creadas <b>.get(/activities):</b> Con ello podras
    visualizar
    todas las operaciones creadas. Se puede realizar la consultasiendo un usuario
    <b>Logueado</b>.
</p>
<p>
    <b>Visualizar una</b> actividad de entre todas <b>.get(/findActivity/:id):</b> Desde aquí
    podrás
    visualizar una actividad que desees. Para realizarlo, deberas previamente,
    <b>Loguearte</b>
    como usuario.
</p>


<p>
    CARPETA <b>MODELS:</b> En esta carpeta guardamos todos los archivos JSON con los modelos que vamos a
    utilizar. Estos modelos se relacionarán con los archivos Router comentados anteriormente.
</p>