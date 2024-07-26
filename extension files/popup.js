document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const classifyButton = document.getElementById("classify");
  const resultsDiv = document.getElementById("results");

  classifyButton.addEventListener("click", async function () {
    const accountAddress = input.value;
    const response = await fetch(`https://api.solana.fm/v1/accounts/${accountAddress}`);
    const accountData = await response.json();
    const transactionData = await fetch(`https://api.solana.fm/v1/transactions/${accountAddress}`);
    const transactionDataJSON = await transactionData.json();

    const ai = await import("./ai.js");
    const predictions = await ai.classifyText(`Account Balance: ${accountData.balance}, Transaction Count: ${accountData.transactions.length}`);
    const transactionPredictions = await ai.classifyText(`Transaction Hash: ${transactionDataJSON.hash}, Transaction Value: ${transactionDataJSON.value}`);

    resultsDiv.innerHTML = `
      <h2>Account Insights:</h2>
      <ul>
        <li>Account Balance: ${accountData.balance}</li>
        <li>Transaction Count: ${accountData.transactions.length}</li>
      </ul>
      <h2>Transaction Insights:</h2>
      <ul>
        <li>Transaction Hash: ${transactionDataJSON.hash}</li>
        <li>Transaction Value: ${transactionDataJSON.value}</li>
      </ul>
      <h2>Predictions:</h2>
      <ul>
        <li>Account: ${predictions}</li>
        <li>Transaction: ${transactionPredictions}</li>
      </ul>
    `;
  });
});
