const from = document.getElementById("reset-pass");
const errSpan = document.getElementById("error");
const subBtn = document.getElementById("submit-from");
const input = document.querySelectorAll(".int");
const cfSucc = document.querySelector(".cf-succ");
const cfInfo = document.querySelector(".cf-info");


from.addEventListener("submit", (e) => {
  e.preventDefault();
  for (let i = 0; i < input.length; i++) {
    const int = input[i];
    if (int.value.trim() === "") {
      int.style.border = "1px solid #ff0444";
      int.focus();
      break;
    } else {
      int.style.border = "1px solid #938585";
      if (input[i].name === "confirmPassword") {
        if (input[0].value === input[1].value) {
          errSpan.textContent = "";
          const url = `http://localhost:3200/resetPassword`;
          const data = {
            password: input[0].value,
            token: location.pathname.split("/")[2],
          };
          subBtn.classList.add("disbled-btn");
          fetch(url, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then(async (response) => {
              const { error } = await response.json();
              if (error) {
                errSpan.textContent = error[0];
              } else {
                cfInfo.style.display = "none";
                cfSucc.style.display = "block";
              }
              subBtn.classList.remove("disbled-btn");
            })
            .catch((err) => {
              subBtn.classList.remove("disbled-btn");
              console.log(err);
            });
        } else {
          errSpan.textContent = "Password and Confirm password should be same";
          break;
        }
      }
    }
  }
});
