/**
 * @private
 *
 * Adds:
 * e.g. { assets: { 'application.js': ... } }
 */
export default (data) => {
  const assets = {};

  (data.assets || []).forEach((f) => {
    const assetname = f.basename.split('.')[0];
    assets[`${assetname}${f.extname}`] = f;
  });

  return { ...data, assets };
}
