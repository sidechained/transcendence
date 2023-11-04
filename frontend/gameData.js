export async function sendGameData(player1Name, player1Points, player2Name, player2Points) {
  const dataToSend = {
    player1_name: player1Name,
    player1_points: player1Points,
    player2_name: player2Name,
    player2_points: player2Points,
  };

  let success = false;
  let msg = undefined;

  try {
    const response = await fetch('http://localhost:8000/api/add_game_data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const responseData = await response.json();
    msg = responseData.message;

    if (response.ok) {
      console.log("Response OK.");
      console.log("Message:", msg);
      success = true;
    } else {
      console.log("Response not OK.");
    }
  } catch (error) {
    msg = "Error: network error";
    console.log(msg);
  }

  return { success, msg };
}

export async function getGameData(id) {
  let success = false;
  let msg = undefined;

  try {
    const response = await fetch(`http://localhost:8000/api/get_game_data/${id}/`, {
      method: 'GET',
      headers: {
        // nothing needed here so far
      },
    });

    if (response.ok) {
      console.log("Response OK.");
      const responseData = await response.json(); // Wait for response data
      success = true;
      console.log(responseData);
      msg = `[Game ${responseData.id}] ${responseData.player1_name} ${responseData.player1_points} - ${responseData.player2_name} ${responseData.player2_points}`;
    } else {
      console.log("Response not OK.");
      msg = responseData.message;
    }
  } catch (error) {
    console.log("Error:", error);
    msg = "Error: network error";
  }

  return { success, msg };
}


