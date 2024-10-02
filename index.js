let userInput = document.getElementById('date')
let result = document.getElementById('result')

//toISOString converte essa data para o formato de string ISO ( ex.: "2024-10-02T15:23:35.123Z" )

//split("T")[0] divide a string resultante no caractere "T" e retorna a primeira parte, que é a data no formato "YYYY-MM-DD"

//ou seja, o código está definindo o valor máximo permitido no campo de data como o dia atual, no formato ISO "YYYY-MM-DD"
userInput.max = new Date().toISOString().split("T")[0]

function calculateAge() {
    let birthDate = new Date(userInput.value)

    let birthDay = birthDate.getDate()
    let birthMonth = birthDate.getMonth() + 1 //O mês inicia no 0, por isso adiciona 1
    let birthYear = birthDate.getFullYear()

    let today = new Date()

    let todayDay = today.getDate()
    let todayMonth = today.getMonth() + 1
    let todayYear = today.getFullYear()

    let day, month, year

    year = todayYear - birthYear

    if (todayMonth >= birthMonth){
        month = todayMonth - birthMonth
        //se o mês atual for maior ou igual ao mês de nascimento, a diferença é calculada diretamente
    } else {
        year--
        month = 12 + todayMonth - birthMonth
        //se o mês atual for menor, significa que ainda não completou o ano atual, então é necessário subtrair um ano e ajustar a diferença de meses somando 12 ao mês atual
    }

    if (todayDay >= birthDay){
        day = todayDay - birthDay
        //se o dia atual for maior ou igual ao dia de nascimento, a diferença é calculada diretamente
    } else {
        month--
        day = getDaysInMonth(birthYear, birthMonth) + todayDay - birthDay
        //se o dia atual for menor do que o dia de nascimento, significa que o mês anterior ainda não foi completado, então o número de dias no mês anterior é somado à diferença de dias, e um mês é subtraído da diferença de meses
    }

    if (month < 0){
        month = 11
        year--
        //se a diferença de meses ficou negativa, significa que a idade é um ano a menos do que inicialmente calculado. Ajusta o valor de meses para 11 e subtrai 1 ano
    }

    if (year < 0) {
        result.innerHTML = `You aren't born yet, be pacient`
    } else {
        result.innerHTML = `You are <span>${year}</span> years, <span>${month}</span> months, <span>${day}</span> days old`
    }

    if (day == 1 && month == 0){
        result.innerHTML = `It is your birthday, you are now <span>${year}</span> years old`
    }

}

// a função getDaysInMonth é uma função que retorna o número de dias de um determinado mês de um determinado ano (considerando anos bissextos)

function getDaysInMonth(year, month) {
    return new Date(year,month, 0).getDate()
}