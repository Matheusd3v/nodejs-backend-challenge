const titleCaseFunction = async (word: string) => {
    const newWord = word.trim().toLowerCase();

    return newWord[0].toUpperCase() + newWord.slice(1);
};

export { titleCaseFunction };
