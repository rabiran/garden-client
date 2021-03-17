
export default (steps = []) => {
    let currentStep = '';
    for (let step of steps) {
        currentStep = step.name;
        let isCompleted = step.subSteps.every(subStep => subStep.progress === 'completed');
        if(!isCompleted) break;
    }
    return currentStep;
};