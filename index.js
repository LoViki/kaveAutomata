
const ermek = [100, 200, 500];
const kavek = [
    {
        nev: "Espresso",
        ar: 300
    },
    {
        nev: "Americano",
        ar: 350
    },
    {
        nev: "Capuccino",
        ar: 450
    },
    {
        nev: "Latte",
        ar: 500
    },
    {
        nev: "Forró csokoládé",
        ar: 400
    }
]

let egyenleg = 0;
let kivalasztottKave = null;
let aVagyAz = "a(z)";

const ermeGombTarolo= document.getElementById("gombok");
const egyenlegKiiro = document.getElementById("egyenleg");
const kaveTarolo = document.getElementById("kavek");
const rendelesGomb = document.getElementById("rendeles");
const visszaAdGomb = document.getElementById("visszaad");
const uzenet = document.getElementById("uzenet");


document.addEventListener('DOMContentLoaded', () => {
    // console.log(egyenleg);
    frissitKijelzo();
    ermeGombokGeneralasa();
    // console.log(kavek);
    gombokkGeneralasa();
    rendelesGomb.addEventListener('click', () =>{
        rendel();
    });

    visszaAdGomb.addEventListener('click', () =>{
        visszaad();
    });
});

function frissitKijelzo(){
    /* Majd írj egy frissitKijelzo() nevű függvényt, 
    amely az egyenleg aktuális értékét beleírja az 
    oldalon lévő #egyenleg id-jű elembe. */
    // egyenlegKiiro.textContent = parseInt(egyenleg);
    egyenlegKiiro.textContent = `${egyenleg} Ft`;
};

function ermeGombokGeneralasa(){

    for (let index = 0; index < ermek.length; index++) {
        const erme = ermek[index];
        const button = document.createElement('button');
        button.textContent = `+${erme}Ft`;
        // console.log(button.textContent);
        ermeGombTarolo.append(button);
        button.addEventListener('click', () =>{
            egyenleg += erme;
            frissitKijelzo();
        })
    }

}

function gombokkGeneralasa(){
    for (let index = 0; index < kavek.length; index++) {
        const kave = kavek[index];
        const button = document.createElement('button');
        button.textContent = `${kave.nev} - ${kave.ar}`;

        kaveTarolo.append(button);
        
        button.addEventListener('focusout', () => {
            button.classList.remove('kivalasztott');
        })

        button.addEventListener('click', () => {
            button.classList.add('kivalasztott');
            kivalasztottKave = kave;
            switch (kivalasztottKave.nev){
                case "Espresso":
                case "Americano":
                    aVagyAz = "az";
                    break;
                case "Capuccino":
                case "Latte":
                case "Forró csokoládé":
                    aVagyAz = "a";
                    break;
                default:
                    aVagyAz = "a(z)";
                    break;
            }
            // console.log(kave);
        });
    }
}

function rendel(){
    if (kivalasztottKave === null){
        uzenet.textContent = "Hiba! Nem választottál kávét."
        return;
    } else {
        if (egyenleg < kivalasztottKave.ar){
            uzenet.textContent = "Kevés az egyenleg!"
        } else {
            uzenet.textContent = `Jó választás! Készül ${aVagyAz} ${kivalasztottKave.nev}.`;
            egyenleg -= kivalasztottKave.ar;
            frissitKijelzo();
            console.log(egyenleg);
            kivalasztottKave = null;
            const kaveGombok = kaveTarolo.querySelectorAll;
            kaveGombok.forEach(kaveGomb => {
                kaveGomb.classList.remove('kivalasztott');
            });
        }
    }
}

function visszaad(){
    if (egyenleg <= 0){
        uzenet.textContent = "Nincs visszaadható összeg."
        return;
    } else {
        uzenet.textContent = `Visszaadva: ${egyenleg} Ft.`
        egyenleg = 0;
        frissitKijelzo();
    }
}