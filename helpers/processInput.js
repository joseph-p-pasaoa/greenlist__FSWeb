/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Server Inputs Processor Helper | Greenlist Registry (a full-stack sustainable material forum app)
*/



const processInput = (input, location, inputName) => {
  switch (location) {

    case "idNum":
      const numCheck1 = isNaN(parseInt(input));
      const numCheck2 = input.length !== parseInt(input).toString().length;
      if (numCheck1 || numCheck2) {
        throw new Error(`400__error: invalid ${inputName} input. please re-enter and try again`);
      }
      return parseInt(input);

    case "hardVarchar22":
      if (!input || !input.trim()) {
        throw new Error(`400__error: empty ${inputName} input. please re-enter and try again`);
      }
      if (input.trim().length >= 22) {
        throw new Error(`400__error: ${inputName} is too long. please shorten`);
      }
      return input.trim();

    case "softVarchar22":
      if (!input || !input.trim()) {
        return "";
      }
      if (input.trim().length > 22) {
        throw new Error(`400__error: ${inputName} is too long. please shorten`);
      }
      return input.trim();

    case "hardVarchar25":
      if (!input || !input.trim()) {
        throw new Error(`400__error: empty ${inputName} input. please re-enter and try again`);
      }
      if (input.trim().length >=  25) {
        throw new Error(`400__error: ${inputName} is too long. please shorten`);
      }
      return input.trim();

    case "softVarchar25":
      if (!input || !input.trim()) {
        return "";
      }
      if (input.trim().length >=  25) {
        throw new Error(`400__error: ${inputName} is too long. please shorten`);
      }
      return input.trim();

    case "hardVarchar50":
      if (!input || !input.trim()) {
        throw new Error(`400__error: empty ${inputName} input. please re-enter and try again`);
      }
      if (input.trim().length >= 50) {
        throw new Error(`400__error: ${inputName} is too long. please shorten`);
      }
      return input.trim();

    case "hardVarchar150":
      if (!input || !input.trim()) {
        throw new Error(`400__error: empty ${inputName} input. please re-enter and try again`);
      }
      if (input.trim().length >=150) {
        throw new Error(`400__error: ${inputName} is too long. please shorten`);
      }
      return input.trim();

    case "softVarchar150":
      if (!input || !input.trim()) {
        return "";
      }
      if (input.trim().length >=150) {
        throw new Error(`400__error: ${inputName} is too long. please shorten`);
      }
      return input.trim();

    case "softPicUrl":
      if (!input || !input.trim()) {
        return "";
      }
      const trimmed = input.trim();
      const protocolCheck = trimmed.slice(0, 7) !== "http://" && trimmed.slice(0, 8) !== "https://";
      const lengthCheck = trimmed.length < 12; // protocol (7) + name(1) + .file format extension (4)
      const acceptable = {
        ".jpg": true,
        "jpeg": true,
        ".png": true,
        ".gif": true,
        ".svg": true
      };
      const fileType = trimmed.slice(-4);
      const typeCheck = acceptable[fileType] !== true;
      if (protocolCheck || lengthCheck || typeCheck) {
        throw new Error(`400__error: invalid ${inputName}. Please enter a valid url`);
      }
      return input.trim();

    case "hardText":
      if (!input || !input.trim()) {
        throw new Error(`400__error: empty ${inputName}. Please enter a valid input`);
      }
      return input.trim();

    case "softText":
      if (!input || !input.trim()) {
        return "";
      }
      return input.trim();

    case "multiLineText":
      if (!input) {
        throw new Error(`400__error: empty ${inputName}. Please enter a valid input`);
      }
      return input;

    case "bool":
      if (input !== "true" && input !== "false") {
        throw new Error(`404__error: invalid ${inputName} data. Please check your input`);
      }
      return input;

    case "creatorPhotoUrl":
      if (input.file) {
        return 'http://' + input.headers.host + '/images/creators/' + input.file.filename;
      }
      return "";

    case "reclaimPhotoUrl":
      if (input.file) {
        return 'http://' + input.headers.host + '/images/reclaims/' + input.file.filename;
      }
      return "";

    default:
      throw new Error("500__error: you're not supposed to be here. input not processed");
  }
}


module.exports = processInput;
