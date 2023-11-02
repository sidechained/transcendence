export function sendGameData() {
  const dataToSend = {
    player1Name: player1Name,
    player1Points: player1Points,
    player2Name: player2Name,
    player2Points: player2Points,
  };

  fetch('http://localhost:3000/addgamedata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // You may include additional headers or authentication tokens here
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Response OK.");
        return 1;
      } else {
        console.log("Response not OK.");
        return 0;
      }
    })
    .catch((error) => {
      console.log("Error.");
      return -1;
    });
}