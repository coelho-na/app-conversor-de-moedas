const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]');

const url = `https://v6.exchangerate-api.com/v6/627f79b9feadd1ee5cf4531d/latest/kSD`;

// Try e catch é uma cláusula que vai tentar executar um código try {},
// se o código que ela tentar executar lançar algum erro, executará o outro código catch(err){} e o erro que foi foi lançado não vai travar o restante do código da aplicação.
// Fetch retorna uma promise.
// Só pode lançar um erro quando tiver dentro de um try catch, porque se um erro for lançado sem um catch , esse erro vai travar o código da aplicação.
// Quando um erro é lançado no try, o objeto de erro é recebido no err do catch e pode ser tratado no catch e o erro que foi lançado no try não vai travar o restante do código
const getErrorMessage = (errorType) =>
  ({
    "unsupported-code": "A moeda não existe em nosso banco de dados",
    "malformed-request":
      "O endpoint do seu request precisa seguir a estrutura a seguir: https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD",
    "invalid-key": "A chave de API não é valida.",
    "quota-reached":
      "Sua conta alcançou o limite de requests permitido em seu plano atual.",
    "inactive-account": "Seu email não foi verificado.",
  }[errorType] || "Não foi possivel obter as informações.");

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Sua conexão falhou. Não foi possivel obter as informações"
      );
    }

    const exchangeRateData = await response.json();

    if (exchangeRateData.result === "error") {
      throw new Error(getErrorMessage(exchangeRateData["error-type"]));
    }
  } catch (err) {
    const div = document.createElement("div");
    const button = document.createElement("button");

    div.textContent = err.message;
    div.classList.add(
      "alert",
      "alert-warning",
      "alert-dismissible",
      "fade",
      "show"
    );
    div.setAttribute("role", "alert");
    button.classList.add("btn-close");

    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "Close");

    button.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(button);
    currenciesEl.insertAdjacentElement("afterend", div);

    /*
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  Mensagem do erro
  <button type="button" class="btn-close"  aria-label="Close"></button>
</div>
    
    */
  }
};

fetchExchangeRate();

const option = `<option>oi</option>`;

currencyOneEl.innerHTML = option;
currencyTwoEl.innerHTML = option;

console.log(currencyOneEl, currencyTwoEl);
