# Security policy

## Supported versions

This repository is a reference starter rather than a continuously supported product. Security fixes target the latest release and the current `main` branch. Older versions are not maintained; consumers should upgrade to the newest reviewed release.

## Reporting a vulnerability

Do not open a public issue containing exploit details, credentials, private data, or an unreleased vulnerability.

Use GitHub's **Security** tab and select **Report a vulnerability** when private vulnerability reporting is enabled. Include:

- the affected version or commit;
- the affected component, export, workflow, or dependency;
- reproduction steps or a minimal proof of concept;
- the expected impact and required attacker capabilities;
- known mitigations; and
- whether disclosure is already planned or public elsewhere.

If private reporting is unavailable, open a public issue containing no sensitive details and ask the maintainer to establish a private reporting channel. Do not send the vulnerability itself until a private channel is confirmed.

The maintainer should acknowledge a complete report, assess scope and severity, prepare tests and a fix privately when appropriate, and coordinate disclosure through a GitHub security advisory. No response-time guarantee is made for this portfolio repository.

## Scope

Reports about the library's shipped code, package contents, release automation, and repository workflows are in scope. Generic dependency reports without a demonstrated impact, social engineering, denial-of-service testing against third-party services, and findings that require exposing another person's data are out of scope.
