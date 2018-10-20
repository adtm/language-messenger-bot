
class LearningService {
    private errorCount: number = 0;

    incrementErrorCount() {
        this.errorCount++;
    }

    resetErrorCount() {
        this.errorCount = 0;
    }

    getErrorCount() {
        return this.errorCount;
    }
}

export default new LearningService();