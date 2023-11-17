export async function sendGameData(player1Name, player1Points, player2Name, player2Points) {
  const dataToSend = {
    player1_name: player1Name,
    player1_points: player1Points,
    player2_name: player2Name,
    player2_points: player2Points,
  };

  try {
    const response = await fetch('https://localhost:8000/api/add_game_data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may include additional headers or authentication tokens here
      },
      body: JSON.stringify(dataToSend),
      mode: 'cors',
    });

    if (response.ok) {
      console.log("Response OK.");
      const responseData = await response.json();
      console.log("Received response data:", responseData);
      // Handle the response data as needed
    } else {
      console.log("Response not OK.");
      // Handle error response
    }
  } catch (error) {
    console.log("Error:", error);
    // Handle network or other errors
  }
}

export function getGameData(id) {
  const dataToSend = {
    id: id,
  };

  fetch('https://localhost:8000/api/get_game_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Response OK.");
        const responseData = response.json();
        responseData.then(data => {
          text = "[Game " + data.id + "] " + data.player1Name + " " + data.player1Points + " - " + data.player2Name + " " + data.player2Points;
          refreshText();
          return 1;
        });
      } else {
        console.log("Response not OK.");
        // Check if the response contains an error message
        return response.json().then(errorData => {
          if (errorData.error) {
            // Handle the error message
            console.log("Error: " + errorData.error);
          }
          return 0;
        });
      }
    })
    .catch((error) => {
      console.log("Error.");
      return -1;
    });
}
