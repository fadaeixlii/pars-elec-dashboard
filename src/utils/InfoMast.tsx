export function maskEmail(email: string, maxStars: number = 5) {
  const atIndex = email.indexOf("@");

  if (atIndex > 0) {
    const localPart = email.substring(0, atIndex);
    const visiblePart = localPart.slice(0, 2);
    const maskedPart =
      localPart.slice(2).length <= maxStars
        ? "*".repeat(localPart.slice(2).length)
        : "*".repeat(maxStars);

    return visiblePart + maskedPart + email.substring(atIndex);
  }

  return email;
}
export function maskPhoneNumber(phoneNumber: string, maxStars: number = 5) {
  // Remove non-numeric characters from the phone number
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Determine the length of the numeric part
  const numericPartLength = numericPhoneNumber.length;

  // If the numeric part length is less than or equal to 4, return the original number
  if (numericPartLength <= 4) {
    return phoneNumber;
  }

  // Calculate the number of digits to be visible (first two digits)
  const visibleDigits = numericPartLength - maxStars;

  // Get the visible part of the phone number
  const visiblePart = numericPhoneNumber.slice(0, visibleDigits);

  // Generate the masked part
  const maskedPart = "*".repeat(maxStars);

  // Combine the visible part and masked part
  return visiblePart + maskedPart;
}

export function maskUUID(uuid: string): string {
  const maskedUUID = uuid.replace(/^(.{8}).+(.{6})$/, "$1...$2");
  return maskedUUID;
}

export function generateUID(length: number) {
  let uid = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    uid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return uid;
}

export function numberToAlphabet(number: number) {
  if (typeof number !== "number" || number < 1 || number > 26) {
    throw new Error("Input must be a number between 1 and 26");
  }
  return String.fromCharCode(64 + number); // A starts at ASCII 65, so we offset by 64
}

export function maskId(id: string): string {
  if (id.length <= 6) {
    // If the ID is too short to mask, return it as is
    return id;
  }
  const start = id.slice(0, 3);
  const end = id.slice(-3);
  return `${start}**${end}`;
}
