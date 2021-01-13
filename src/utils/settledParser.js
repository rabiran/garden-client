export default async (ids, method) => {
    const requests = ids.map((id) => method(id));
    const results = await Promise.allSettled(requests);

    console.log(results);

    let errors = results.filter((result) => result.status === 'rejected');
    let resolved = results.filter((result) => result.status === 'fulfilled');
    let succesfulIds = [];
    return { errors, resolved, succesfulIds };
}