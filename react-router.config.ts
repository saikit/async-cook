import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src/app',
  ssr: false,
  prerender: ['/not-found'],
  future: {
    v8_middleware: true,
  },
} satisfies Config;
