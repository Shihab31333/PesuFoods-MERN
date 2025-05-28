// upiIntegration.js

// Function to generate UPI payment link
export const generateUPILink = (merchantUPI, amount, note = 'FoodOrder') => {
    const upiLink = `upi://pay?pa=${merchantUPI}&pn=MerchantName&tr=uniqueTransactionId&am=${amount}&cu=INR&tn=${note}`;
    return upiLink;
  };
  