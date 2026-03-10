const healthUrl = process.env.HEALTHCHECK_URL || 'http://localhost:5500/api/health';
const timeoutMs = Number(process.env.HEALTHCHECK_TIMEOUT_MS || 5000);

const run = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(healthUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
        });

        if (!response.ok) {
            console.error(`Healthcheck failed: HTTP ${response.status}`);
            process.exit(1);
        }

        const payload = await response.json().catch(() => ({}));
        if (!payload.ok) {
            console.error('Healthcheck failed: invalid payload', payload);
            process.exit(1);
        }

        console.log(`Healthcheck OK: ${healthUrl}`);
        process.exit(0);
    } catch (error) {
        const message = error.name === 'AbortError'
            ? `Healthcheck timeout after ${timeoutMs}ms`
            : error.message;

        console.error(`Healthcheck failed: ${message}`);
        process.exit(1);
    } finally {
        clearTimeout(timeout);
    }
};

run();
