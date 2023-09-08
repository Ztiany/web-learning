import {ref, watchEffect} from "vue";

function useStorage(name, defaultValue) {
    const data = JSON.parse(localStorage.getItem(name)) || defaultValue;
    console.log("useStorage: data", data);
    let refData = ref(data);
    watchEffect(() => {
        const toSave = JSON.stringify(refData.value);
        console.log("useStorage: watchEffect save", toSave);
        localStorage.setItem(name, toSave);
    });
    return refData;
}

export default useStorage;