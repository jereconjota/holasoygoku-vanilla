function cargarPersonaje() { 
    let avatar = document.getElementById('avatar')
    let nombre = document.getElementById('nombre-personaje')
    let frase = document.getElementById('frase')
    let rdm = Math.floor(Math.random()*(27-1))+1 //numero random de 1 a 26
    // rdm=10
    avatar.src = "/images/"+rdm+".png"
    switch(rdm){
        case 1:
        nombre.innerHTML = 'Goku'
        frase.innerHTML = '"Oye, no te emociones, no nos has vencido todavía."'
        break
        case 2:
        nombre.innerHTML = 'Vegeta'
        frase.innerHTML = '"¿Qué sucede Freezer? ¿Tu cerebro es otro de tus músculos débiles y sin usar?"'
        break
        case 3:
        nombre.innerHTML = 'Bulma'
        frase.innerHTML = '"¡Que alguien me ayude! ¡Soy demasiado joven y bonita para morir!"' 
        break
        case 4:
        nombre.innerHTML = 'Piccoro'
        frase.innerHTML = '"Dejenme en paz, el que este verde no significa que no este maduro"'
        break
        case 5:
        nombre.innerHTML = 'Maestro Roshi'
        frase.innerHTML = '"Hay que trabajar, Hay que aprender, hay que comer, hay que descansar y tambien hay que jugar"'
        break
        case 6:
        nombre.innerHTML = 'Goku'
        frase.innerHTML = '"Prefiero ser un mono descerebrado que un monstruo sin corazón"'
        break
        case 7:
        nombre.innerHTML = 'Broli'
        frase.innerHTML = '"¿Qué es ser consciente?"'
        break
        case 8:
        nombre.innerHTML = 'Freezer'
        frase.innerHTML = '"Soy el poderoso Freezer y sí, todas las historias horribles que has escuchado son ciertas"'
        break
        case 9:
        nombre.innerHTML = 'Gohan'
        frase.innerHTML = '"¿Pelear contigo? Vengo a matarte"'
        break
        case 10:
        nombre.innerHTML = 'Vegeta'
        frase.innerHTML = '"Mientras el enemigo siga de pie, yo seguiré peleando"'
        break
        case 11:
        nombre.innerHTML = 'Goku'
        frase.innerHTML = '🖤'
        break
        case 12:
        nombre.innerHTML = 'Goku'
        frase.innerHTML = '"A veces la vida es muy incierta para los arrepentimientos."'
        break
        case 13:
        nombre.innerHTML = 'Nº17'
        frase.innerHTML = '"Sacrificarse por el bien de los demás... es un acto muy humano"'
        break
        case 14:
        nombre.innerHTML = 'Octavio'
        frase.innerHTML = '"Goku no puede morir, pase lo que pase yo lo protegere"'
        break
        case 15:
        nombre.innerHTML = 'Nº16'
        frase.innerHTML = '"Gohan, protege a los seres vivos y a las plantas de este mundo que tanto ame...te lo encargo"'  
        break
        case 16:
        nombre.innerHTML = 'Cell'
        frase.innerHTML = '"¡Necio! ¿¡No te das cuenta que estás peleando contra el arma perfecta?!"'
        break
        case 17:
        nombre.innerHTML = 'Maestro Karin'
        frase.innerHTML = '"Pelea hasta estar satisfecho."'
        break
        case 18:
        nombre.innerHTML = 'Bardock'
        frase.innerHTML = '"Kakaroto tu debes cumplir mi objetivo...tu seras quien vengara la muerte de todos los Saiyajin y la desaparición del Planeta Vegeta"'
        break
        case 19:
        nombre.innerHTML = 'Freezer'
        frase.innerHTML = '"Antes de comenzar tu patética lucha por sobrevivir, debería advertirte. Tu posibilidad de ganar es inexistente"'
        break
        case 20:
        nombre.innerHTML = 'Vegeta'
        frase.innerHTML = '"Trunks, Bulma, esto es por ustedes. Esto también es por ti Kakaroto."'
        break
        case 21:
        nombre.innerHTML = 'Krillin'
        frase.innerHTML = '"Goku, será un gusto pelear contigo de aquí en adelante."'
        break
        case 22:
        nombre.innerHTML = 'Krillin'
        frase.innerHTML = '"Me gustaría que cambiaras al Androide 17 y 18 a seres humanos, así podrán vivir una vida normal en paz."'
        break
        case 23:
        nombre.innerHTML = 'Majin Boo'
        frase.innerHTML = '"A pesar de ser un buen niño eres muy Fuerte"'
        break
        case 24:
        nombre.innerHTML = 'Bulma'
        frase.innerHTML = '"¡No te preocupes, te protegeré de la carita aterradora de tu papá!"'
        break
        case 25:
        nombre.innerHTML = 'Goku'
        frase.innerHTML = '"Mas vale qe te calmes maldito asesino, mataste a cruelmente a personas inocentes una tras otras, te atreviste a matar a Krilin"'
        break
        case 26:
        nombre.innerHTML = 'Vegeta'
        frase.innerHTML = '"Por favor elimina a freezer, por favor matalo con tus manos de Saiyajin."'
        break
        default:
        nombre.innerHTML = ''
        frase.innerHTML = ''
    }
}
cargarPersonaje()