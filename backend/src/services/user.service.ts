import { Team } from '../models/team.model';

export function authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        Team.findOne(username)
            .then((user) => {
                if (user && password === user.password) {
                    // authentication successful
                    resolve({
                        _id: user._id
                    });
                } else {
                    // authentication failed
                    resolve();
                }
            }).catch((err) => {
                reject(err.name + ': ' + err.message);
            })
    });
}
