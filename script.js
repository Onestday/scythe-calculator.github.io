document.addEventListener("DOMContentLoaded", function () {
    const playerForm = document.getElementById("player-form");
    const addPlayerBtn = document.getElementById("add-player");
    const removePlayerBtn = document.getElementById("remove-player");
    const calculateBtn = document.getElementById("calculate");
    const resultsTable = document.getElementById("results");

    let players = [];

    function createPlayerRow() {
        const playerIndex = players.length + 1;
        const row = document.createElement("div");
        row.classList.add("player-row");

        row.innerHTML = `
            <input type="text" class="player-name" placeholder="Player ${playerIndex}">
            <input type="number" class="popularity-level" placeholder="Popularity">
            <input type="number" class="stars" placeholder="Stars">
            <input type="number" class="areas" placeholder="Areas Controlled">
            <input type="number" class="resources" placeholder="Resources">
            <input type="number" class="earned-coins" placeholder="Earned Coins">
            <input type="number" class="bonus-coins" placeholder="Bonus Coins">
        `;
        playerForm.appendChild(row);
        players.push(row);
    }

    function removePlayerRow() {
        if (players.length > 0) {
            const row = players.pop();
            playerForm.removeChild(row);
        }
    }

    function calculateScores() {
        const scores = players.map((row, index) => {
            const name = row.querySelector(".player-name").value || `Player ${index + 1}`;
            const popularity = parseInt(row.querySelector(".popularity-level").value, 10);
            const stars = parseInt(row.querySelector(".stars").value, 10);
            const areas = parseInt(row.querySelector(".areas").value, 10);
            const resources = Math.floor(parseInt(row.querySelector(".resources").value, 10) / 2);
            const earnedCoins = parseInt(row.querySelector(".earned-coins").value, 10);
            const bonusCoins = parseInt(row.querySelector(".bonus-coins").value, 10);

            let x1, x2, x3;
            if (popularity >= 0 && popularity <= 6) {
                x1 = 3;
                x2 = 2;
                x3 = 1;
            } else if (popularity >= 7 && popularity <= 12) {
                x1 = 4;
                x2 = 3;
                x3 = 2;
            } else if (popularity >= 13 && popularity <= 18) {
                x1 = 5;
                x2 = 4;
                x3 = 3;
            }

            const totalScore = stars * x1 + areas * x2 + resources * x3 + earnedCoins + bonusCoins;
            return { name, totalScore };
        });

        scores.sort((a, b) => b.totalScore - a.totalScore);
        displayScores(scores);
    }

    function displayScores(scores) {
        const tbody = resultsTable.querySelector("tbody");
        tbody.innerHTML = "";

        scores.forEach((score) => {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            const scoreCell = document.createElement("td");

            nameCell.textContent = score.name;
            scoreCell.textContent = score.totalScore;

            row.appendChild(nameCell);
            row.appendChild(scoreCell);
            tbody.appendChild(row);
        });
    }

    addPlayerBtn.addEventListener("click", createPlayerRow);
    removePlayerBtn.addEventListener("click", removePlayerRow);
    calculateBtn.addEventListener("click", calculateScores);

    // Create the first player row by default
    createPlayerRow();
});


