"use strict"
const referencia = {
    retornarLinha(inputTarget) {
        const indicadorOutput = document.querySelector(".reference__output--indicador");
        const indicadoresSubcol1 = document.querySelectorAll(".ficha__subcol-de-indicadores-1 span");
        let indicadoresSubcol2 = document.querySelectorAll(".ficha__subcol-de-indicadores-2 span");
        const inputTargetAndSiblings = inputTarget.parentElement.children;
        let inputTargetIndex;
        for(let i = 0; i < inputTargetAndSiblings.length; i++) {
            if(inputTargetAndSiblings[i] === inputTarget) inputTargetIndex = i;
        }
        let indicadorSubcol1Index = inputTargetIndex < 7 ? 0 : inputTargetIndex < 14 ? 1 : 2;
        if(inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--2")) {
            indicadorSubcol1Index = inputTargetIndex < 7 ? 3 : 4;
        } else if(inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--3")) {
            indicadoresSubcol2 = document.querySelectorAll(".ficha__col-de-indicadores--seccao-3 span");
            indicadorOutput.value = indicadoresSubcol2[inputTargetIndex].textContent;
            return false;
        }
        let indicadorSubcol1 = indicadoresSubcol1[indicadorSubcol1Index].textContent;
        let indicadorSubcol2 = indicadoresSubcol2[inputTargetIndex].textContent;
        indicadorOutput.value = `${indicadorSubcol1}: ${indicadorSubcol2}`;
    },
    retornarColuna(inputTarget)  {
        const faixaEtariaOutput = document.querySelector(".reference__output--idade");
        let faixasEtarias = document.querySelectorAll(".seccao__header__linha-de-faixas-etarias span");
        if(inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--3")) {
            faixasEtarias = document.querySelectorAll(".ficha__seccao__pseudo-header--seccao-3 span");
        }
        let inputTargetParentAndUncles = inputTarget.parentElement.parentElement.children;
        let inputTargetIndex = 0;
        for(let i = 0; i < inputTargetParentAndUncles.length; i++) {
            if(inputTargetParentAndUncles[i] === inputTarget.parentElement) {
                inputTargetIndex = i - 1;
            }
        }
        faixaEtariaOutput.value = faixasEtarias[inputTargetIndex].textContent;
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const o of outputs) o.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {
            if(!inputCelular.matches("[readonly]")) {
                referencia.retornarLinha(inputCelular);
                referencia.retornarColuna(inputCelular);
            }
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;