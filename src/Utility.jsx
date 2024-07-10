// get id of the cockpit window

export const calculateRatio = (a, b, c) => c * (b / a)

// gauge 
export const calculateRatioForRange = (ax, ay, bx, by, cx) => bx + ((ay - cx) * ((by - bx) / (ay - ax)))

export const calculatePercent = (a, b) => ((b - a) / a) * 100

export const calculatePercentOf = (a, percent) => ((a * percent) / 100) + a





// convert javascript object to dictionary
export const objectToDictionary = object => {
    const array = []
    for (const key in object) {
        array.push({ 'key': key, 'value': object[key] })
    }
    return array
}

// convert dictionary to javascript object
export const dictionaryToObject = array => {
    const object = {}
    array?.forEach(data => {
        object[data.key] = data.value
    })
    return object
}

/* dev messaging channel */
export const channel = new BroadcastChannel('DEV')

/* post message */
// export const postMessage = (appState, data) => {
//     appState.dev ? channel.postMessage(JSON.stringify(data)) : window.vuplex?.postMessage(JSON.stringify(data))
// }
export const postMessage = (data) => {
   channel.postMessage(JSON.stringify(data)) 
}
/* update blackbox */
export const updateTruckState = (appState, data) => {
    // react to unity 
    const parsedData = objectToDictionary(data)
    if (appState.dev && appState.blackboxEnabled) {
        channel.postMessage(JSON.stringify({ "act": 'setStorage', "data": parsedData }))
    }
    else if (!appState.dev && window.vuplex) {
        window.vuplex.postMessage(JSON.stringify({ "act": 'setStorage', "data": parsedData }))
    }
    else {
        console.error('Unable to update Blackbox. Storage not initialized. Please open the route "/#/dev/truckstate" to enable dev truckstate.')
    }
}

/* get blackbox */
export const getTruckState = appState => {
    // to get current balckbox state form unity 
    if (appState.dev) {
        channel.postMessage(JSON.stringify({ 'act': 'getStorageData' }))

    }
    else if (!appState.dev && window.vuplex) {
        window.vuplex.postMessage(JSON.stringify({ 'act': 'getStorageData' }))
    }
    else {
        console.error('Unable to get Blackbox state. Storage not initialized. Please open the route "/dev/blackbox" to enable dev blackbox.')
    }
}

/* subscribe to incoming message */
export const subscribeToEvents = ( setMessage) => {
    // if (!appState.dev && window.vuplex) {
    //     // form unity 
    //     window.vuplex.addEventListener('message', ({ data }) => {
    //         setMessage(JSON.stringify({ data: data ? JSON.parse(data) : {}, timeStamp: new Date().getTime() }))
    //     })
    // }
        // local setup wiht button's
        channel.addEventListener('message', ({ data }) => {
            setMessage(JSON.stringify({ data: data ? JSON.parse(data) : {}, timeStamp: new Date().getTime() }))
        })
    }
   

