let canvas = document.getElementById('grafico')
let quadro = document.getElementById('quadroGrafico')
let lapis = canvas.getContext('2d')
let inputX = document.getElementsByClassName('valorX')
let inputY = document.getElementsByClassName('valorY')
let inputs = document.getElementById('inputs')
let enviar = document.getElementById('enviar')
let adiciona = document.getElementById('adiciona')
let ndevaloresX = []
let ndevaloresY = []
let X = canvas.width
let Y = canvas.height
let periodo = undefined
function desenha() {
    let cimaoubaixo = true
    lapis.clearRect(0, 0, X, Y)
    lapis.beginPath()
    lapis.setLineDash([])
    periodo = 1
    lapis.lineWidth = 2
    lapis.moveTo(0, 200)
    for (let i = 0; i < ndevaloresX.length; i++) {
        lapis.lineTo(ndevaloresX[i], ndevaloresY[i])
        lapis.arc(ndevaloresX[i], ndevaloresY[i], 2, 0, 2 * Math.PI)
        dados()
        console.log(periodo)
        lapis.font = 'bold 10px roboto'
        lapis.fillText(ndevaloresY[i], X - 15, ndevaloresY[i])
        if (cimaoubaixo) {
            lapis.fillText(ndevaloresX[i], ndevaloresX[i] - 5, Y)
            cimaoubaixo = false
        }
        else {
            lapis.fillText(ndevaloresX[i], ndevaloresX[i] - 5, 15)
            cimaoubaixo = true
        }
    }
    lapis.stroke()
    cimaoubaixo = true
    for (let i = 0; i < ndevaloresX.length; i++) {
        lapis.beginPath()
        lapis.setLineDash([5, 5])
        lapis.moveTo(ndevaloresX[i], ndevaloresY[i])
        if (cimaoubaixo) {
            lapis.lineTo(ndevaloresX[i], Y - 10)
            cimaoubaixo = false
            lapis.stroke()

        }
        else {
            lapis.lineTo(ndevaloresX[i], 15)
            cimaoubaixo = true
            lapis.stroke()
        }
    }
}
function dados() {
    let tabelinha = document.getElementById('tabelinhaDeDados')
    let row = document.createElement('tr')
    tabelinha.appendChild(row)
    console.log(ndevaloresX)
    tabelinha.innerHTML = `<tr>
                <th class="header">Período</th>
                <th class="header">X</th>
                <th class="header">Y</th>
                <th class="header">Diferença</th>
                <th class="header">Porcentagem de Aproveitamento</th></tr>`
    let inputX = document.getElementsByClassName('valorX')
    let inputsX = Array.from(inputX)
    inputsX.forEach((input) => {
        row = document.createElement('tr')
        row.classList.add('row')
        tabelinha.appendChild(row)
    })
    let rows = document.getElementsByClassName('row')
    let arrayRow = Array.from(rows)
    arrayRow.forEach((row) => {
        let diferenca = 'Valor inicial'
        let porcentagem = 'Valor inicial'
        if ((ndevaloresY.length - 1) >= 1){
            diferenca = Math.abs(ndevaloresY[periodo] - ndevaloresY[periodo-1])
        }
        if ((ndevaloresY.length - 1) >= 1){
            porcentagem = (((ndevaloresY[ndevaloresY.length-1] - ndevaloresY[ndevaloresY.length-2]) / ndevaloresY[ndevaloresY.length-2]) * 100).toFixed(2)
        }
       row.innerHTML = `<td>${periodo}</td>
                       <td>${ndevaloresX[periodo-1]}
                       <td>${ndevaloresY[periodo-1]}
                       <td>${diferenca}</td>
                       <td>${porcentagem}</td>`
        
        periodo++
    }
    )
}



enviar.addEventListener('click', () => {
    let arrayX = Array.from(inputX)
    let arrayY = Array.from(inputY)
    ndevaloresX = []
    ndevaloresY = []
    let caixasVazias = 0
    arrayX.forEach(valorX => {
        if (!valorX.value) {
            caixasVazias++
            alert(`Existem ${caixasVazias} caixas com valores vazias`)
            return
        }
        else if (isNaN(Number(valorX.value))) {
            alert('Insira apenas números')
            return
        }
        ndevaloresX.push(Number(valorX.value))
        ndevaloresX.sort((a, b) => a - b)
        canvas.width = ndevaloresX[ndevaloresX.length - 1] + 25
        X = canvas.width
    })
    arrayY.forEach(valorY => {
        if (!valorY.value) {
            caixasVazias++
            alert(`Existem ${caixasVazias} caixas com valores vazias`)
            return
        }
        else if (isNaN(Number(valorY.value))) {
            alert('Insira apenas números')
            return
        }
        ndevaloresY.push(Number(valorY.value))
    });
    let Ysort = ndevaloresY.sort((a, b) => a - b)
    if (Ysort[Ysort.length - 1] > canvas.height) {
        canvas.height = Ysort[Ysort.length - 1]
        Y = canvas.height
    }

    desenha()
})
function adicionar() {
    let novoinputX = document.createElement('input')
    let novoinputY = document.createElement('input')
    let div = document.createElement('div')
    div.classList.add('XeY')
    novoinputX.classList.add('valorX')
    novoinputX.placeholder = 'Coloque um valor X'
    novoinputY.classList.add('valorY')
    novoinputY.placeholder = 'Coloque um valor Y'
    inputs.appendChild(div)
    div.appendChild(novoinputX)
    div.appendChild(novoinputY)
}
function aleatorio1() {
    let editor = document.getElementById('editorAleatorio')
    editor.style.display = 'flex'
}
function remover() {
    if (inputs.childElementCount == 1) {
        alert('É necessário haver no mínimo 1 conjunto de valores')
        return
    }
    inputs.lastElementChild.remove()
}

function adicionarEixos() {
    document.getElementById('quantEixos').textContent++
}
function reduzirEixos() {
    if (document.getElementById('quantEixos').textContent == 1) {
        alert('É necessário haver no mínimo 1 conjunto de valores')
        return
    }
    document.getElementById('quantEixos').textContent--
}

function aleatorio2() {
    let quantValores = document.getElementById('quantEixos').textContent
    let maximoX = document.getElementById('aleatorioX').value
    let maximoY = document.getElementById('aleatorioY').value
    let arrayatorioX = []
    let arrayatorioY = []
    if (!maximoX || !maximoY) {
        alert('Existem uma ou mais caixas com valores máximos não especificados')
        return
    }
    for (let i = quantValores; i > 0; i--) {
        arrayatorioX.push(Math.floor(Math.random() * maximoX))
    }
    for (let i = quantValores; i > 0; i--) {
        arrayatorioY.push(Math.floor(Math.random() * maximoY))
    }
    arrayatorioX.sort((a, b) => a - b)
    let Ysort = arrayatorioY.sort((a, b) => a - b)
    if (Ysort[Ysort.length - 1] > canvas.height) {
        canvas.height = Ysort[Ysort.length - 1]
        Y = canvas.height
    }
    if (arrayatorioX[arrayatorioX.length - 1] > canvas.width) {
        canvas.width = arrayatorioX[arrayatorioX.length - 1]
        X = canvas.width
    }
    ndevaloresX = arrayatorioX
    ndevaloresY = arrayatorioY
    desenha()
    dados()
}
function fadeout() {
    let editor = document.getElementById('editorAleatorio')
    editor.style.animation = 'fadeOut 0.5s ease'
    setTimeout(() => {
        editor.style.display = 'none'
        editor.style.animation = 'fadeIn 0.5s ease'
    }, 450);

}

