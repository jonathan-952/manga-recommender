const axios = require('axios');
const authToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJkYWQ1NDUwNzM2NGQ3Y2FlZWYwMjViNjVmMzM4NmFlM2JjNTNjMmM2ZGRkMGE2MmQ0YTAzMWNkYTk4MWNlYjg4ODQ0OWJlNWNkNmYzOGIyIn0.eyJhdWQiOiJkMWQ2ZGIxM2FmMDJiYWI3MGZhY2I2YmIwNTM0YjRmMiIsImp0aSI6ImJkYWQ1NDUwNzM2NGQ3Y2FlZWYwMjViNjVmMzM4NmFlM2JjNTNjMmM2ZGRkMGE2MmQ0YTAzMWNkYTk4MWNlYjg4ODQ0OWJlNWNkNmYzOGIyIiwiaWF0IjoxNzM1NDU5Mzk2LCJuYmYiOjE3MzU0NTkzOTYsImV4cCI6MTczODEzNzc5Niwic3ViIjoiOTY3NzA2MSIsInNjb3BlcyI6W119.ZhAyMQFBCu5z9nTbkUEuJrutWyzyQh_B_lUzIT1QeNlG23Ecxn7eSCrUZcIVAeBTdwH-8wzryYYqs_V7_f-XReiXIGcmrFhJMvI-EHkXDH9EkSWXN7uOLfTbjnd-nQItkgAgwI4aPizskrWPxfcZ1OH2hv0dfWKsPKpbv9Pd1iXWUX22LifYegqU0LIR8uYFxurMjKTfU0ExP99oquo1z7hUkZPZqKVVd74Zc5ddqXa0dK7xMcjpjvh5gpuXgT4moW-SmRtgVODSp3PXoRtC09LyqIsfJ6QARI1hUnR91DyoFjagqAcKCflpyc5EeIwXuWbMJQ2qM4Ef8QWmf7YAgQ'
const {AddToDB} = require('../db.js');

async function get_ranking(ranking_type, limit) {
    try {
        const res = await axios.get('https://api.myanimelist.net/v2/anime/ranking', {
            params: {
                "ranking_type": `${ranking_type}`,
                "limit": `${limit}`,
                "fields": 'id, title, main_picture, synopsis, genres, num_episodes',
            },
            headers: {
                'Authorization': authToken
            }
        })
        return res.data.data;
    } catch (err) {
        console.log(err.message)
    }
}

let ranking = 21314;
while (ranking < 21315) {
    try {
        const res = await get_ranking("all", 500)
        for (const element of res) {
            AddToDB(
                element.node.id, element.node.title, element.node.synopsis, 
                element.node.genres, element.node.main_picture, element.node.num_episodes)
        }
    } catch (err) {
        console.log(err.message)
    }
    ranking++
}


// function generateCodeVerifier(length) {
//     const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
//     let verifier = "";
  
//     for (let i = 0; i < length; i++) {
//       verifier += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
  
//     return verifier;
//   }

// //   const codeVerifier = generateCodeVerifier(128); // Generate a 128-character code verifier
//   const clientID = 'd1d6db13af02bab70facb6bb0534b4f2'
//   const client_secret = 'd4c603f1041d38b456f850f581be015ccedc70f3c4e53408316b7ba7a88cdda';
//   const authUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientID}&code_challenge=${codeVerifier}`;

// const tokenUrl = `https://myanimelist.net/v1/oauth2/token?client_id=${clientID}&client_secret=${client_secret}&code=def502008c7248220b5aeb6a8f113b1b4e7dd6daf5cf8d924f58bbe1d3e2c8add442151328e12adae7517d5eb7e0a6235a1d974551ce42d93b201d5169e098e36d2ba25217424a9a936fd19b188828133db56a648e2334437041cd3457411379db388c9378d167ea44e376fa146af7ff3818980e082114031b9efebe781b60f800f6dff05a4d337a1ae6d44d3389273c50e168731bbef4a448b3a3e73091192a9d6ba428c0c5fd1f674c2b176c50586c5ed6e78449ac0164b9d9e8a690d09ccf6a3e8545051f8bb0212d2891235df91656d26c269b16c71fecf031058c6a9d18677b93cf29942d205fb55ffb4b2053a7a65a5e9e8e69c86773ccc3eb19544b0e6acf4f8710c959fdf12375832ca5fd920dc07df3dfcf2e47e9d373438b9f8699de6b184514fa882f16a0e47ba1fb86b183be2a2e2ce399e3556b4acdb9692c825f89ef3f1c0426e47138530582301cbdd82e0a5cc7cb4cede0f4061836656cf0540eb8d1f9eec83d4822bfdcc8c06aa810a87584a7b2d054812b9a0a275239d30a5394831a3ea2cdf4d0242445b0c0057b87f0e44153f5b53cd4760d2400252264fcd9b106e5a2dbb57514937f7aa01c14ab1ea307d2f8245d6e1dba99ee1e98cf9b47c6a883df287ed60bfa4499cbaff734cef31a2f0b75e6762ab1dabb4507e5e75867d1ba16f2b9&code_challenge=Hisng3DAlLTPpw6vH5fU9eKfyF1R-clfRylappIAuKOs4ZkSpBQOE681Fw2kh1IqQcZSy33y0ZWYARFq~bqXRjXdj7NroZgiAzmO24Z32jDvGe9mujncrmpvnsuHSRpP&grant_type=authorization_code`



// console.log(authUrl)
