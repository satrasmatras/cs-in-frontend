const instructions = {
    'SET A': 0,
    'PRINT A': 1,
    'IFN A': 2,
    'RET': 3,
    'DEC A': 4,
    'JMP': 5,
    'INC A': 6,
    'SET': 7,
};

const program = [
    instructions['SET A'],
    10,
    instructions['PRINT A'],
    instructions['IFN A'],
    instructions['RET'],
    0,
    instructions['DEC A'],
    instructions['JMP'],
    2
];

const InstructionsArgs = {
    [instructions["SET A"]]: 1,
    [instructions['PRINT A']]: 0,
    [instructions['IFN A']]: 0,
    [instructions.RET]: 1,
    [instructions["DEC A"]]: 0,
    [instructions['INC A']]: 0,
    [instructions.JMP]: 1,
    [instructions.SET]: 2,
};


/**
 * Создание массива с соответствие индекса инструкций их положению в общем списке команд.
 * @param program
 * @returns {*[]}
 */
const readInstructionsMap = (program) => {
    const instructionsMap = [];
    let i = 0;
    while (i < program.length) {
        const byte = program[i];
        if (Object.values(instructions).includes(byte)) {
            instructionsMap.push(i);
            i += InstructionsArgs[byte];
        }
        i += 1;
    }
    return instructionsMap;
};

const execute = (program) => {
    const state = {};
    const instructionsMap = readInstructionsMap(program);
    let pointer = 0;

    while (true) {
        const instruction = program[pointer];
        const args = program.slice(pointer + 1, pointer + 1 + InstructionsArgs[instruction]);
        let withIncrement = true;
        switch (instruction) {
            case instructions["SET A"]:
                state['a'] = args[0];
                break;
            case instructions["SET"]:
                state[args[0]] = args[1];
                break;
            case instructions["DEC A"]:
                state['a'] -= 1;
                break;
            case instructions["INC A"]:
                state['a'] += 1;
                break;
            case instructions['PRINT A']:
                console.log(state['a']);
                break;
            case instructions.RET:
                return args[0];
            case instructions.JMP:
                pointer = instructionsMap[args[0] - 1];
                withIncrement = false;
                break;
            case instructions["IFN A"]:
                if (state['a'] !== 0) {
                    const currentInstructionOrder = instructionsMap.findIndex(
                        (instructionIndex) => instructionIndex === pointer
                    );
                    pointer = instructionsMap[currentInstructionOrder + 2];
                    withIncrement = false;
                }
                break;
            default:
                throw new Error(`Unknown instruction: ${instruction}`);
        }

        if (withIncrement) {
            pointer += args.length + 1;
        }
    }
};

const result = execute(program);
console.log('Program ended with ', result);