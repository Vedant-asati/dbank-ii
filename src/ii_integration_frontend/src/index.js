import {
  createActor,
  ii_integration_backend,
} from "../../declarations/ii_integration_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
let actor = ii_integration_backend;
console.log(process.env.CANISTER_ID_INTERNET_IDENTITY);
const whoAmIButton = document.getElementById("whoAmI");
whoAmIButton.onclick = async (e) => {
  e.preventDefault();
  whoAmIButton.setAttribute("disabled", true);
  const principal = await actor.whoami();
  whoAmIButton.removeAttribute("disabled");
  document.getElementById("principal").innerText = principal.toString();
  return false;
};
const loginButton = document.getElementById("login");
loginButton.onclick = async (e) => {
  e.preventDefault();
  let authClient = await AuthClient.create();
  // start the login process and wait for it to finish
  await new Promise((resolve) => {
      authClient.login({
          identityProvider:
              process.env.DFX_NETWORK === "ic"
                  ? "https://identity.ic0.app"
                  : `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
          onSuccess: resolve,
      });
  });
  const identity = authClient.getIdentity();
  const agent = new HttpAgent({ identity });
  actor = createActor(process.env.CANISTER_ID_II_INTEGRATION_BACKEND, {
      agent,
  });
  return false;
};
//////////////////

let currentBalance=0.00;
const updateBalance= async()=>{
try {
  console.log("jai siyaram...");
  currentBalance=await actor.getBalance();
  currentBalance=Math.round(currentBalance*100)/100;
  document.getElementById("balance").innerHTML=currentBalance;
  console.log("Updated balance");
} catch (error) {
  console.log(error);
}
}
//
window.addEventListener("load",()=>{
  updateBalance();
});
let submitButton=document.getElementById("submit-btn");
submitButton.addEventListener("click",async (e)=>{
  e.preventDefault();
  // console.log("j")
  try {
    console.log("jsr started");
    submitButton.setAttribute("disabled",true);
    const incValue =parseFloat(document.getElementById("input-amount").value);
    const decrValue =parseFloat(document.getElementById("withdrawal-amount").value);
    await actor.inc(incValue);
    let a=await actor.decr(decrValue);
    console.log("jsr done");
    submitButton.removeAttribute("disabled");
    await updateBalance();

  } catch (error) {
    console.log(error);
  }
})
