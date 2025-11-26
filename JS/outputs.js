const output = document.getElementById('output');
const input = document.getElementById('commandInput');

const commands = {
    help: "\nBASIC COMMANDS:\nlist file - Lists all files in the current directory.\naccess file [x] - Access a file, with [x] being the file name.\ncmd - Open a new command window.\n",
    "?": "\nBASIC COMMANDS:\nlist file - Lists all files in the current directory.\naccess file [x] - access a file, with [x] being the file name.\ncmd - Open a new command window.\n",
    about: "\nMiniFirm OS XD SP5, v2048.567.42 - Copyright MiniFirm Technologies 2005.\nThis Command-Line Interface (CLI) has been included with MiniFirm OS XD to provide familiarity to previous users of MiniFirm OS v3.1.\n",
    "list file": "LOG.txt\nLOG-1.txt\nLOG-2.txt\nLOG-3.txt\ntotally_secret_game_info.txt",
    "access file LOG.txt": "-- LOG.txt --\nBOOTING UP...............................\nMiniFirm OS (v3.1)\nCopyright © MiniFirm 1986\nANALYSING HARD DISK DRIVE\nTIME...9 HARD DISK FOUND\nDATA FOUND\nVOICE-TO-TEXT PROTOCOL INITIATED:\n[Not speech]\n[Not speech]\nHelp. me\n[Not speech]\nREMOTE SHUTDOWN INITIATED\nSHUTTING DOWN\n-- END OF LOG --",
    "access file LOG-1.txt": "-- LOG-1.txt --\nBOOTING UP...............................\nMiniFirm OS (v3.1)\nCopyright © MiniFirm 1986\nANALYSING HARD DISK DRIVE\nTIME...1 NO HARD DISK FOUND,TRYING AGAIN\nANALYSING HARD DISK DRIVE\nTIME...10 HARD DISK FOUND\nDATA FOUND\nThe system has detected newer MiniFirm OS data on this hard disk, would you like to upgrade your system? Y/N\nUSER$> Y\nCHECKS RETURNED OK. UPDATING SYSTEM...\nSHUTTING DOWN\n-- END OF LOG --",
    "access file LOG-2.txt": "-- LOG-2.txt --\n...\nMiniFirm OS Command - © Minifirm 2005\nUnable to find user name. Reverting to Default...\nLocal$User> list drv\nDRIVES -----------------------------\nBAY...NAME..........ID\n1.....CARROT........2910\n2.....RUFRUF........3458\nLocal$User> sel 2\nBAY 2 SELECTED\nLocal$User> format drv mffs /q\nPerforming a quick format...\n[####################################!!]\nLocal$User> list drv\nDRIVES -----------------------------\nBAY...NAME..........ID\n1.....CARROT........2910\n2.....CANNOT READ...CANNOT READ\nLocal$User> exit\n-- END OF LOG --",
    "access file LOG-3.txt": "-- LOG-3.txt --\n...\nMiniFirm OS Command - © MiniFirm 2005\nUnable to find user name. Reverting to default...\nLocal$User> list drv\nDRIVES -----------------------------\nBAY...NAME..........ID\n1.....CARROT........2910\nLocal$User> sel 1\nBAY 1 SELECTED\nLocal$User> format drv mffs /q\nPerforming a quick format...\n[####################################!!]\nLocal$User> list drv\nDRIVES -----------------------------\nBAY...NAME..........ID\n1.....CANNOT READ...CANNOT READ\nLocal$User> exit\n-- END OF LOG --",
    boot: "Cannot boot OS, is system corrupted?",
    "boot safe": "Cannot boot OS in safe mode, is system corrupted?",
    "list drv": "\nDRIVES -----------------------------\nBAY...NAME..........ID\n",
    carrot: "Carrots are good for you!",
    prmsn: "\nHere is a list of your access permissions as a remote user on this device:\nREAD FILES - TRUE\nWRITE FILES - FALSE\nBOOT MINIFIRM OS XD - FALSE\nBOOT MINIFIRM OS XD IN SAFE MODE - FALSE\nACCESS MINIFIRM OS XD COMMAND-LINE INTERFACE - TRUE\n",
    usr: "\nUnable to find user name. Reverting to Default...\nThis user (User) is stored locally on this device and has low-level remote access permissions.\n",
    Y: "Yes to what? Cannot find operation, cancelling.",
    N: "No to what? Cannot find operation, cancelling.",
    "sel 1": "Cannot find drive in bay 1.",
    "sel 2": "Cannot find drive in bay 2.",
    "format drv mffs /q": "Format what drive?",
    exit: "Cannot exit: Please close the remote session window/tab.",
    y: "Yes to what? Cannot find operation, cancelling.",
    n: "No to what? Cannot find operation, cancelling.",
    "access file totally_secret_game_info.txt": "Hey, if you somehow only found me through this website\nand you're interested in the game, check out my website at\nhttps://black-ink-games.carrd.co/# for a link\nto my gamejolt and my other projects!",
    "cmd": function() {
      output.innerHTML += `Opening a new command window.`;
    
      output.scrollTop = output.scrollHeight;

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },

    default: "Command not registered. Type 'help' or '?' for a list of basic commands. Commands are case-sensitive."
};

function processCommand(userInput) {
    output.innerHTML += `Local$User> ${userInput}<br>`;

    if (commands[userInput]) {
      if (typeof commands[userInput] === 'function') {
        commands[userInput]();
      } else {
        output.innerHTML += `${commands[userInput].replace(/\n/g, '<br>')}<br>`;
      }
    } else {
        output.innerHTML += `${commands.default.replace(/\n/g, '<br>')}<br>`;
    }

    output.scrollTop = output.scrollHeight;
}

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const userInput = input.value.trim();
        processCommand(userInput); 
        input.value = '';
    }
});
