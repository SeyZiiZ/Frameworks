export async function fetchData(data) {
    const owner = data.owner;
    const repo = data.repo
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log('Error during the fetch', err);
    }
}