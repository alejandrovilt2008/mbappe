console.clear();
console.log("APP CARGADO");

const API_KEY = "AIzaSyAkb7BsSW6ROnIfM01djn4ZbiX7PKpi-f8";
const SIGNUP_URL =
`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const SIGNIN_URL =
`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

let userToken = null;

let palabras = [];

let indice = 0;

let puntaje = 0;

let temaActual = "";

let tiempo = 30;

let temporizador = null;

let experiencia = 0;

let nivel = 1;

let vidas = 3;

let aciertos = 0;

let errores = 0;

const temas = {

tecnologia:[

{
pista:"C_MPU_____ / C_MPU______",
respuesta:[
"COMPUTADOR",
"COMPUTADORA",
"COMPUTADOR ",
"COMPUTADORA "
]
},

{
pista:"PR_GR_MA",
respuesta:[
"PROGRAMA",
"PROGRAMA "
]
},

{
pista:"INT_RN_T",
respuesta:[
"INTERNET",
"INTERNET "
]
},

{
pista:"J_V_SCR_PT",
respuesta:[
"JAVASCRIPT",
"JAVASCRIPT "
]
},

{
pista:"HT_L",
respuesta:[
"HTML",
"HTML "
]
},

{
pista:"CI_NCI_",
respuesta:[
"CIENCIA",
"CIENCIA "
]
},

{
pista:"M_T_M_TIC_S",
respuesta:[
"MATEMÁTICAS",
"MATEMÁTICAS "
]
}

],

paises:[

{
pista:"C_L_MB__",
respuesta:[
"COLOMBIA",
"COLOMBIA "
]
},

{
pista:"M_X_C_",
respuesta:[
"MÉXICO",
"MÉXICO "
]
},

{
pista:"ESP_Ñ_",
respuesta:[
"ESPAÑA",
"ESPAÑA "
]
},

{
pista:"ARG_NT_N_",
respuesta:[
"ARGENTINA",
"ARGENTINA "
]
},

{
pista:"P_R_",
respuesta:[
"PERÚ",
"PERÚ "
]
},

{
pista:"B_G_T_",
respuesta:[
"BOGOTÁ",
"BOGOTÁ "
]
},

{
pista:"M_DR_D",
respuesta:[
"MADRID",
"MADRID "
]
}

],

animales:[

{
pista:"P_RR_",
respuesta:[
"PERRO",
"PERRO "
]
},

{
pista:"G_T_",
respuesta:[
"GATO",
"GATO "
]
},

{
pista:"L_ON",
respuesta:[
"LEÓN",
"LEÓN "
]
},

{
pista:"T_GR_",
respuesta:[
"TIGRE",
"TIGRE "
]
},

{
pista:"E_F_NT_",
respuesta:[
"ELEFANTE",
"ELEFANTE "
]
},

{
pista:"D_LF_N",
respuesta:[
"DELFIN",
"DELFIN "
]
},

{
pista:"P_G_S_",
respuesta:[
"PEGASO",
"PEGASO "
]
}

],

frutas:[

{
pista:"M_NZ_N_",
respuesta:[
"MANZANA",
"MANZANA "
]
},

{
pista:"P_R_",
respuesta:[
"PERA",
"PERA "
]
},

{
pista:"PL_T_NO",
respuesta:[
"PLÁTANO",
"PLÁTANO "
]
},

{
pista:"S_ND_A",
respuesta:[
"SANDÍA",
"SANDÍA "
]
},

{
pista:"FR_S_",
respuesta:[
"FRESA",
"FRESA "
]
},

{
pista:"M_L_N",
respuesta:[
"MELÓN",
"MELÓN "
]
},

{
pista:"N_R_NJ_",
respuesta:[
"NARANJA",
"NARANJA "
]
}

],

deportes:[

{
pista:"F_TB_L",
respuesta:[
"FÚTBOL",
"FÚTBOL "
]
},

{
pista:"B_LON_ES_O",
respuesta:[
"BALONCESTO",
"BALONCESTO "
]
},

{
pista:"T_N_S",
respuesta:[
"TENIS",
"TENIS "
]
},

{
pista:"V_L_IB_L",
respuesta:[
"VOLEIBOL",
"VOLEIBOL "
]
},

{
pista:"N_T_CI_N",
respuesta:[
"NATACIÓN",
"NATACIÓN "
]
},

{
pista:"C_RR_R_",
respuesta:[
"CARRERA",
"CARRERA "
]
},

{
pista:"B_X__",
respuesta:[
"BOXEO",
"BOXEO "
]
}

],

comida:[

{
pista:"P_ZZ_",
respuesta:[
"PIZZA",
"PIZZA "
]
},

{
pista:"H_MB_RG_S_",
respuesta:[
"HAMBURGUESA",
"HAMBURGUESA "
]
},

{
pista:"P_ST_",
respuesta:[
"PASTA",
"PASTA "
]
},

{
pista:"S_P_",
respuesta:[
"SOPA",
"SOPA "
]
},

{
pista:"A_R__Z",
respuesta:[
"ARROZ",
"ARROZ "
]
},

{
pista:"P_LL_",
respuesta:[
"POLLO",
"POLLO "
]
},

{
pista:"H__V_",
respuesta:[
"HUEVO",
"HUEVO "
]
}

]

};

function traducirError(codigo){

    const errores={

        EMAIL_EXISTS:
        "El correo ya está registrado.",

        EMAIL_NOT_FOUND:
        "No existe una cuenta con ese correo.",

        INVALID_PASSWORD:
        "La contraseña es incorrecta.",

        INVALID_EMAIL:
        "Correo inválido.",

        WEAK_PASSWORD:
        "La contraseña debe tener mínimo 6 caracteres."

    };

    return errores[codigo] ||
    "Ha ocurrido un error.";

}

function cargarPerfil(){

    experiencia =
    parseInt(localStorage.getItem("xp")) || 0;

    nivel =
    parseInt(localStorage.getItem("nivel")) || 1;

    vidas =
    parseInt(localStorage.getItem("vidas")) || 3;

    aciertos =
    parseInt(localStorage.getItem("aciertos")) || 0;

    errores =
    parseInt(localStorage.getItem("errores")) || 0;

}

function guardarPerfil(){

    localStorage.setItem(
    "xp",
    experiencia
    );

    localStorage.setItem(
    "nivel",
    nivel
    );

    localStorage.setItem(
    "vidas",
    vidas
    );

    localStorage.setItem(
    "aciertos",
    aciertos
    );

    localStorage.setItem(
    "errores",
    errores
    );

}

async function register(){

    const email =
    document.getElementById("email")
    .value
    .trim();

    const password =
    document.getElementById("password")
    .value;

    const mensaje =
    document.getElementById("auth-message");

    mensaje.textContent="";

    try{

        const respuesta =
        await fetch(SIGNUP_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,
                password,
                returnSecureToken:true

            })

        });

        const datos =
        await respuesta.json();

        if(datos.error){

            throw new Error(datos.error.message);

        }

        mensaje.style.color="green";

        mensaje.innerHTML=
        "✅ Registro exitoso. Ahora inicia sesión.";

    }

    catch(error){

        mensaje.style.color="red";

        mensaje.innerHTML=
        traducirError(error.message);

    }

}

async function login(){

    const email =
    document.getElementById("email")
    .value
    .trim();

    const password =
    document.getElementById("password")
    .value;

    const mensaje =
    document.getElementById("auth-message");

    mensaje.textContent="";

    try{

        const respuesta =
        await fetch(SIGNIN_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,
                password,
                returnSecureToken:true

            })

        });

        const datos =
        await respuesta.json();

        if(datos.error){

            throw new Error(datos.error.message);

        }

        userToken = datos.idToken;

        localStorage.setItem(
        "userToken",
        userToken
        );

        localStorage.setItem(
        "usuario",
        email
        );

        cargarPerfil();

        mostrarLobby();

    }

    catch(error){

        mensaje.style.color="red";

        mensaje.innerHTML=
        traducirError(error.message);

    }

}

function mostrarLogin(){

    document.getElementById("inicio-container").style.display="none";

    document.getElementById("login-container").style.display="block";

    document.getElementById("lobby-container").style.display="none";

    document.getElementById("game-container").style.display="none";

}

function mostrarLobby(){

    document.getElementById("inicio-container").style.display="none";

    document.getElementById("login-container").style.display="none";

    document.getElementById("lobby-container").style.display="block";

    document.getElementById("game-container").style.display="none";

    const usuario =
    localStorage.getItem("usuario");

    if(usuario){

        document.getElementById("usuario").textContent =
        usuario;

    }

    let puntajeTotal = 0;

    Object.keys(localStorage).forEach(clave=>{

        if(clave.startsWith("progreso_")){

            const progreso =
            JSON.parse(localStorage.getItem(clave));

            if(progreso){

                puntajeTotal += progreso.puntaje;

            }

        }

    });

    document.getElementById("puntajeTotal").textContent =
    puntajeTotal + " pts";

    document.getElementById("nivel").textContent =
    "Nivel " + (Math.floor(puntajeTotal/10)+1);

}

function cerrarSesion(){

    clearInterval(temporizador);

    userToken = null;

    localStorage.removeItem("userToken");

    localStorage.removeItem("usuario");

    document.getElementById("inicio-container").style.display="block";

    document.getElementById("login-container").style.display="none";

    document.getElementById("lobby-container").style.display="none";

    document.getElementById("game-container").style.display="none";

}

function seleccionarTema(tema){

    temaActual = tema;

    palabras = [...temas[tema]];

    const progreso =
    JSON.parse(
    localStorage.getItem("progreso_"+tema)
    );

    if(progreso){

        indice = progreso.indice;

        puntaje = progreso.puntaje;

    }

    else{

        indice = 0;

        puntaje = 0;

    }

    document.getElementById("lobby-container").style.display="none";

    document.getElementById("game-container").style.display="block";

    document.getElementById("tema-actual").innerHTML =

    "📚 " +
    tema.charAt(0).toUpperCase() +
    tema.slice(1);

    document.getElementById("puntaje").innerHTML =

    "Puntaje: " + puntaje;

    mostrarPalabra();

}

function volverLobby(){

    clearInterval(temporizador);

    mostrarLobby();

}

function reiniciarNivel(){

    clearInterval(temporizador);

    indice = 0;

    puntaje = 0;

    guardarProgreso();

    document.getElementById("puntaje").innerHTML =
    "Puntaje: 0";

    mostrarPalabra();

}

function mostrarPalabra(){

    clearInterval(temporizador);

    if(indice >= palabras.length){

        document.getElementById("pista").innerHTML="";

        document.getElementById("resultado").innerHTML=
        "🎉 ¡Has completado este tema!";

        document.getElementById("contador").innerHTML="";

        document.getElementById("barra-progreso").style.width="100%";

        guardarProgreso();

        return;

    }

    document.getElementById("pista").innerHTML =
    palabras[indice].pista;

    document.getElementById("respuesta").value="";

    document.getElementById("resultado").innerHTML="";

    document.getElementById("puntaje").innerHTML =
    "Puntaje: " + puntaje;

    actualizarBarra();

    tiempo = 30;

    iniciarTemporizador();

}

function iniciarTemporizador(){

    clearInterval(temporizador);

    document.getElementById("contador").innerHTML =
    "⏱ " + tiempo + " segundos";

    temporizador = setInterval(()=>{

        tiempo--;

        document.getElementById("contador").innerHTML =
        "⏱ " + tiempo + " segundos";

        if(tiempo <= 0){

            clearInterval(temporizador);

            document.getElementById("resultado").style.color="red";

            document.getElementById("resultado").innerHTML =
            "⏰ Tiempo agotado";

            indice++;

            guardarProgreso();

            actualizarBarra();

            setTimeout(()=>{

                mostrarPalabra();

            },1200);

        }

    },1000);

}

function actualizarBarra(){

    const porcentaje =

    (indice / palabras.length) * 100;

    document.getElementById("barra-progreso").style.width =
    porcentaje + "%";

}

function verificar(){

    clearInterval(temporizador);

    const respuesta =

    document.getElementById("respuesta")
    .value
    .trim()
    .toUpperCase();

    const resultado =

    document.getElementById("resultado");

    if(
        palabras[indice]
        .respuesta
        .includes(respuesta)
    ){

        resultado.style.color="green";

        resultado.innerHTML=
        "✅ ¡Correcto!";

        puntaje++;

        experiencia++;

        aciertos++;

        if(experiencia>=10){

            experiencia=0;

            nivel++;

        }

        guardarPerfil();

        document.getElementById("puntaje").innerHTML =
        "Puntaje: " + puntaje;

        const estrella =
        document.getElementById("estrella");

        estrella.style.display="block";

        estrella.style.animation="none";

        void estrella.offsetWidth;

        estrella.style.animation =
        "brillarGirar 1.5s ease forwards";

        setTimeout(()=>{

            estrella.style.display="none";

        },1500);

    }

    else{

        resultado.style.color="red";

        resultado.innerHTML=
        "❌ Incorrecto";

        errores++;

        guardarPerfil();

    }

    indice++;

    guardarProgreso();

    actualizarBarra();

    if(indice < palabras.length){

        setTimeout(()=>{

            mostrarPalabra();

        },1200);

    }

    else{

        setTimeout(()=>{

            resultado.style.color="green";

            resultado.innerHTML=
            "🎉 ¡Juego terminado!";

            document.getElementById("contador").innerHTML="";

            document.getElementById("pista").innerHTML="";

        },1200);

    }

}

function guardarProgreso(){

    if(!temaActual) return;

    const progreso={

        indice:indice,

        puntaje:puntaje

    };

    localStorage.setItem(

        "progreso_"+temaActual,

        JSON.stringify(progreso)

    );

}

function actualizarEstadisticas(){

    let total = 0;

    Object.keys(localStorage).forEach(clave=>{

        if(clave.startsWith("progreso_")){

            const progreso = JSON.parse(localStorage.getItem(clave));

            if(progreso){

                total += progreso.puntaje;

            }

        }

    });

    const nivelActual =
    Math.floor(total/10)+1;

    const puntajeHTML =
    document.getElementById("puntajeTotal");

    const nivelHTML =
    document.getElementById("nivel");

    if(puntajeHTML){

        puntajeHTML.innerHTML =
        total + " pts";

    }

    if(nivelHTML){

        nivelHTML.innerHTML =
        "Nivel " + nivelActual;

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    const respuesta =
    document.getElementById("respuesta");

    if(respuesta){

        respuesta.addEventListener("keypress",(e)=>{

            if(e.key==="Enter"){

                verificar();

            }

        });

    }

});

window.onload=()=>{

    cargarPerfil();

    const token =
    localStorage.getItem("userToken");

    if(token){

        userToken = token;

        mostrarLobby();

        actualizarEstadisticas();

    }

    else{

        document.getElementById("inicio-container").style.display="block";

        document.getElementById("login-container").style.display="none";

        document.getElementById("lobby-container").style.display="none";

        document.getElementById("game-container").style.display="none";

    }

};

function animacionCambio(){

    const juego =
    document.getElementById("game-container");

    if(!juego) return;

    juego.style.opacity="0";

    setTimeout(()=>{

        juego.style.opacity="1";

    },150);

}

function reiniciarPerfil(){

    if(!confirm("¿Deseas borrar todo tu progreso?")){

        return;

    }

    Object.keys(localStorage).forEach(clave=>{

        if(clave.startsWith("progreso_")){

            localStorage.removeItem(clave);

        }

    });

    localStorage.removeItem("xp");

    localStorage.removeItem("nivel");

    localStorage.removeItem("vidas");

    localStorage.removeItem("aciertos");

    localStorage.removeItem("errores");

    experiencia = 0;

    nivel = 1;

    vidas = 3;

    aciertos = 0;

    errores = 0;

    actualizarEstadisticas();

    alert("✅ Progreso eliminado correctamente.");

}

console.log("Encuentra la Palabra iniciado correctamente.");