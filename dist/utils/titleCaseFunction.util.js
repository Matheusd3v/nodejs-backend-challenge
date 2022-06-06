"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleCaseFunction = void 0;
const titleCaseFunction = async (word) => {
    const newWord = word.trim().toLowerCase();
    return newWord[0].toUpperCase() + newWord.slice(1);
};
exports.titleCaseFunction = titleCaseFunction;
//# sourceMappingURL=titleCaseFunction.util.js.map