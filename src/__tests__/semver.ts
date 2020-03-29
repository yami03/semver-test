const semver = require('semver');

describe('npm-semver functions test', () => {
  test('valid(release)는 parsing version을 반환해야하며, 유효하지 않다면 null을 반환해야 한다.', () => {
    expect(semver.valid('1.2.3')).toEqual('1.2.3');
    expect(semver.valid(semver.coerce('^1.2.3'))).toEqual('1.2.3');
    expect(semver.valid('a.b.c')).toEqual(null);
  });

  test('inc(v, release)는 release type (major, premajor, minor, preminor, patch, prepatch, or prerelease)이 증가된 버전을 반환해야하며, 유효하지 않다면 null을 반환해야 한다.', () => {
    expect(semver.inc('1.2.3-alpha.2', 'major')).toEqual('2.0.0');
    expect(semver.inc('1.2.3-alpha.2', 'premajor')).toEqual('2.0.0-0');
    expect(semver.inc('1.2.3', 'minor')).toEqual('1.3.0');
    expect(semver.inc('3.27.2-alpha.2', 'prepatch')).toEqual('3.27.3-0');
    expect(semver.inc('3.27.2-alpha.2', 'prerelease')).toEqual('3.27.2-alpha.3');
  });

  test('intersects(r1, r2, loose)는 범위에 허용되는 경우 true를 반환해야 한다.', () => {
    expect(semver.intersects('^1.2.3', '2.0.0')).toEqual(false);
    expect(semver.intersects('^1.0.0', '1.9.0')).toEqual(true);
    expect(semver.intersects('^1.2.3-beta.2', '^1.2.3-beta.4')).toEqual(true);
    expect(semver.intersects('~1.2.3', '~1.3.0')).toEqual(false);
    expect(semver.intersects('~1', '2')).toEqual(false);
  });

  test('prerelease(v)는 prerelease의 구성요소를 배열로 반환해야하며 없는 경우 null을 반환해야 한다.', () => {
    expect(semver.prerelease('1.2.3-alpha.2')).toEqual(['alpha', 2]);
    expect(semver.prerelease('1.2.3')).toEqual(null);
  });

  test('parse(v)는 SemVer object또는 null을 반환해야 한다.', () => {
    const semVerObj = {
      build: [],
      includePrerelease: false,
      loose: false,
      major: 1,
      minor: 2,
      options: { includePrerelease: false, loose: false },
      patch: 3,
      prerelease: ['alpha', 2],
      raw: '1.2.3-alpha.2',
      version: '1.2.3-alpha.2',
    };

    expect(semver.parse('1.2.3-alpha.2')).toEqual(semVerObj);
  });

  test('satisfies(version, range)는 버전이 range에 해당된다면 true를 반환해야 한다.', () => {
    expect(semver.satisfies('1.2.3', '^1.2.2')).toEqual(true);
    expect(semver.satisfies('2.0.0', '^1.2.2')).toEqual(false);
    expect(semver.satisfies('1.2.3', '>=1.0.0 <2.0.0')).toEqual(true);
    expect(semver.satisfies('~1.2.3', '~1.3.0')).toEqual(false);
  });
});
