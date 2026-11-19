// this builds off of class-18-demo
// we are adding the fetch request in our interval function

require('dotenv').config()

const m = require('masto')

const masto = m.createRestAPIClient({
    url: 'https://networked-media.itp.io/',
    accessToken: process.env.TOKEN,
});

const rules = require('./rules.js');
const strings = require('./strings.js');

async function makeStatus(text) {
    const status = await masto.v1.statuses.create({
        status: text,
        // TODO: change visability to public when project ready to run
        visibility: 'public',
    });
}

setInterval(async () => {
    if (isSleeping()) return;

    // TODO: ADD API REQUEST
    // change localhost to your partner's droplet IP (their server must be running)
    // if needed, change the port (6003) to match your partner's app.listen in *their* server.js
    let url = 'http://68.183.134.242:6003/get-data';

    let response = await fetch(url)
    let json = await response.json()
    // what do you want to do with your partner's data?
    //     it will use the json variable for any manipulation
    // console.log(json)
    // TODO: SELECT ITEM FROM JSON AND MANIPULATE IT FOR YOUR BOT
    //    the json is an array, so you will need to select a specific item from it 
    //    and whatever property you would like to access. 
    //    likely, you will need to test your partner's data and see how they format it
    for (let i = 0; i < rules.MAX_POSTS_PER_HOUR; i++) {
        let name_index = Math.floor(Math.random() * rules.STUDENT_NAMES.length);
        let name = rules.STUDENT_NAMES[name_index];

        let handle = `@${rules.STUDENT_HANDLES[name_index]}`;
        if (rules.STUDENT_HANDLES[name_index] == '') handle = '';

        let action_index = Math.floor(Math.random() * strings.actions.length);
        let num_action_modifiers = Math.floor(Math.random() * 4);
        let action_modifiers = "";
        for (let i = 0; i < num_action_modifiers; i++) {
            action_modifiers += " ";
            action_modifiers += strings.action_modifiers[Math.floor(Math.random() * strings.action_modifiers.length)];
        }

        let action_length = Math.floor(Math.random() * 100);
        let action = strings.actions[action_index][0];
        for (let i = 0; i < action_length; i++) {
            action += strings.actions[action_index][1];
        }
        action += strings.actions[action_index][2];
        
        let data_index = Math.floor(Math.random() * json.length)
        let object = "";
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                object = json[data_index].symptoms;
                break;
            case 1:
                object = json[data_index].condition;
                if (data_index == 6) object = json[data_index].symptoms;
                break;
            case 2:
                object = json[data_index].animal;
        }

        let educator_present = Math.random() < 0.5;
        let educator = rules.EDUCATOR_NAMES[Math.floor(Math.random() * rules.EDUCATOR_NAMES.length)];
        let educator_actions = strings.educator_actions[Math.floor(Math.random() * strings.educator_actions.length)];
        let post = `${name} ${handle}${action_modifiers} ${action} ${object} `;
        if (educator_present) {
            post += `${educator_actions} ${educator}`;
        }
        // make our status
        makeStatus(post);
    }

    // TODO: CHANGE 5000ms TO YOUR SPECIFIC INTERVAL
}, 3600000); 

function isSleeping() {
    now = new Date();
    return now.getHours() >= 7 && now.getHours() <= 10;
}
