import app from '@/app';
import logger from '@/shared/logger.service';
import { properties } from '@/properties';

export default app.listen(properties.server.port, () => {
    logger.info('Express server listening on port ', properties.server.port);
});
