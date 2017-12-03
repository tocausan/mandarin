/** word model **/

module.exports = class {

    constructor(data) {
        this.traditional = data.traditional ? data.traditional : '';
        this.simplified = data.simplified ? data.simplified : '';
        this.pinyinNumber = data.pinyinNumber ? data.pinyinNumber : '';
        this.pinyinTone = data.pinyinTone ? data.pinyinTone : this.pinyinNumberToTone(this.pinyinNumber);
        this.pinyinAtone = data.pinyinAtone ? data.pinyinAtone : this.pinyinToneToAtone(this.pinyinTone);
        this.translation = data.translation ? data.translation : '';
    }


    /** get pinyin toe out of number **/
    pinyinNumberToTone(pinyin) {
        if (!pinyin) return '';

        // data sample: dui4bu5qi3
        // tone numbers and accents
        let vowels = 'aeiouv',
            tones = ['āáăàa', 'ēéĕèe', 'īíĭìi', 'ōóŏòo', 'ūúŭùu', 'ǖǘǚǜü'],
            splittedPinyin = pinyin.split(''),
            wordStartIndex = 0,
            words = [];

        // split sentence into words
        splittedPinyin.map((character, index) => {
            // extract word if found number
            if (Number.isInteger(parseInt(character))) {
                // extract word from sentence
                var word = splittedPinyin.slice(wordStartIndex, index + 1);
                words.push(word.join(''));
                // update sentence
                wordStartIndex = index + 1;
            }
        });

        // update pinyin with accent
        words.map((pinyinNumber, wordIndex) => {
            let splittedPinyinNumber = pinyinNumber.split(''),
                toneIndex = parseInt(splittedPinyinNumber[splittedPinyinNumber.length - 1]) - 1,
                pinyin = splittedPinyinNumber.slice(0, splittedPinyinNumber.length - 1),
                charIndex = -1;

            // detect the last vowel
            pinyin.map((char, index) => {
                if (vowels.indexOf(char) >= 0) {
                    charIndex = index;
                }
            });

            if (charIndex !== -1) {
                // update last vowel into tone
                let vowel = pinyin[charIndex],
                    vowelTone = tones[vowels.indexOf(vowel)][toneIndex],
                    pinyinTone = pinyin.join('').replace(vowel, vowelTone);

                words[wordIndex] = pinyinTone;
            }
        });

        // retrn pinyin tone
        return words.join('');
    };

    /** get pinyin atone out of tone **/
    pinyinToneToAtone(pinyin) {
        // empty
        if (!pinyin) return '';

        // return pinyin atone
        return pinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

};



