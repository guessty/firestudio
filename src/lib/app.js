import next from 'next'
//
import libConfig from './config'

module.exports = ({ dir, dev }) => next({ dir, dev, conf: libConfig.nextConfig })
