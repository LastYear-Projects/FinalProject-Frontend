export const isHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
};