/** word model **/
let enums = require('../enums');

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

    /** select data **/
    static selectData(data, selection){
        switch (selection) {
            case enums.dictionaryItem.ALL:
                return data;
                break;

            case enums.dictionaryItem.TRADITIONAL:
                return data.map(item => item.traditional);
                break;

            case enums.dictionaryItem.SIMPLIFIED:
                return data.map(item => item.simplified);
                break;

            case enums.dictionaryItem.PINYIN_NUMBER:
                return data.map(item => item.pinyinNumber);
                break;

            case enums.dictionaryItem.PINYIN_TONE:
                return data.map(item => item.pinyinTone);
                break;

            case enums.dictionaryItem.PINYIN_ATONE:
                return data.map(item => item.pinyinAtone);
                break;

            case enums.dictionaryItem.TRANSLATION:
                return data.map(item => item.translation);
                break;

            default:
                return data;
                break;
        }
    };

};



