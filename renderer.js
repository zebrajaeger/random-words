document.getElementById("myButton").addEventListener("click", switchWord);
switchWord();

async function switchWord() {
    document.querySelector(".result").innerHTML = await window.singleWord();
}
