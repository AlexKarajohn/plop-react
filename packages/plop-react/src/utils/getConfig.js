import findConfig from 'find-config';
import fs from 'fs'

export const getConfig = async () => {
    const closestConfigPath = findConfig('reactgen.config.json');
    if (!closestConfigPath)
        throw new Error('No configuration file found.')
    console.log('Using configuration file found at: '+ closestConfigPath)
    const config = fs.readFileSync(closestConfigPath)
    if(!config) throw new Error('Error parsing configuration file.')
    return JSON.parse(config);
}