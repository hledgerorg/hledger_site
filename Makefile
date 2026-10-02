CURRENT_RELEASE=1.52

default: build

# Install some required tools.
tools:
	@cargo install mdbook --version 0.5.2
	@which python3 >/dev/null || { echo "python3 is required for sitemap generation but not found"; exit 1; }
	@printf "To build caddy for hledger.org:\n\
	\n\
	cd /usr/local/bin && \\ \n\
	curl -o eget.sh https://zyedidia.github.io/eget.sh && \\ \n\
	bash eget.sh && \\ \n\
	eget caddyserver/xcaddy && \\ \n\
	xcaddy build v2.11.2 --with github.com/caddyserver/transform-encoder --with github.com/caddy-dns/cloudflare\n\
	\n\
	"

# Render the current site and current dev and release manuals, saving them in out/ and out2/.
# See notes below.
# The current release should be the last version rendered.
# mdbook removes the sitemap files, so we rebuild those afterward.
build:
	@echo "building site with the current and dev manuals"
	@make -s build3-dev
	@make -s build3-1.52
	@make -s sitemap
	@make -s restore-assets

# Render most versions of manuals (excluding old unpackaged versions). 
#
# This is fiddly because of how mdbook works. Goals (simplified 2025-08):
# - in the sidebar, link to the current release version of manuals only
# - in the site search, search only the current manuals (ideally the current release version)
# - keep old versions of the manuals out of search engines
#
# mdbook won't render (and will remove rendered versions of) any pages not linked in SUMMARY.
# We work around this by, for each version,
# temporarily linking that version of the manuals in SUMMARY, rendering the whole site,
# and saving the rendered manuals in out2/VERSION/ (which caddy serves as /VERSION/*).
# A limitation: when viewing an old manual, the sidebar manuals links will all be
# to that old version.
# Re-rendering the whole site for each version is of course wasteful and slow,
# but it's how we ensure all manual versions include the latest site sidebar.
#
# Keep this list synced with site.js.
# The current release should be the last version rendered.
# Old hledger versions had seven manuals, newer ones have three.
# mdbook removes the sitemap files, so we rebuild those afterward.
all: \
	build7-1.0 \
	build7-1.2 \
	build7-1.9 \
	build7-1.10 \
	build7-1.12 \
	build7-1.18 \
	build7-1.19 \
	build3-1.21 \
	build3-1.22 \
	build3-1.23 \
	build3-1.24 \
	build3-1.25 \
	build3-1.26 \
	build3-1.27 \
	build3-1.28 \
	build3-1.29 \
	build3-1.30 \
	build3-1.31 \
	build3-1.32 \
	build3-1.33 \
	build3-1.34 \
	build3-1.40 \
	build3-1.41 \
	build3-1.42 \
	build3-1.43 \
	build3-1.50 \
	build3-1.51 \
	build3-1.99.5 \
	build3-dev \
	build3-1.52
	@make -s sitemap
	@make -s restore-assets

# Render the three manuals for a specified hledger version >1.21 (or "dev"), as out2/VER/.
# Their source should exist in src/VER/.
# This adds noindex meta attribute to the page template unless building the current release version,
# adjusts the sidebar's manuals links' text and target to VER,
# builds the site, and copies the rendered manuals from out/VER/ to out2/VER/.
# After this you should rebuild the site with the current manuals (make build).
build3-%:
	@echo "building site with the three $* manuals in /$*"
	@if [ ! x"$*" = x"$(CURRENT_RELEASE)" ] ; then \
		sed -i -e 's/<\/title>/<\/title>\n<meta name="robots" content="noindex" \/>/' theme/index.hbs; \
	fi
	@perl -i -pe "s%^- +\[(hledger(|-ui|-web) manual)[^]]*?\]\([^/]*?/(hledger(|-ui|-web)\.md)%- [\1 ($*)]($*/\3%" src/SUMMARY.md
	@mdbook build && mkdir -p out2 && cp -r out/$* out2
	@# Preserve hashed assets so they survive the next mdbook build (which deletes out/)
	@mkdir -p out2/.assets out2/.assets/css out2/.assets/fonts out2/.assets/js && \
	 cp -n out/*-*.js out/*-*.min.js out/*-*.css 2>/dev/null out2/.assets/ || true; \
	 cp -n out/css/*-*.css 2>/dev/null out2/.assets/css/ || true; \
	 cp -n out/fonts/*-*.css 2>/dev/null out2/.assets/fonts/ || true; \
	 cp -n out/js/*-*.js 2>/dev/null out2/.assets/js/ || true
	@git checkout -- theme/index.hbs src/SUMMARY.md

# Render the seven manuals for a specified hledger version <=1.21, as out2/VER/.
# Their source should exist in src/VER/.
# See above.
build7-%:
	@echo "building site with the seven $* manuals in /$*"
	@sed -i -e 's/<\/title>/<\/title>\n<meta name="robots" content="noindex" \/>/' theme/index.hbs
	@perl -i -p0e "s%^- +\[hledger manual.*?hledger-web\.md\)%- [hledger manual ($*)]($*/hledger.md)\n- [hledger-ui manual ($*)]($*/hledger-ui.md)\n- [hledger-web manual ($*)]($*/hledger-web.md)\n- [journal manual ($*)]($*/journal.md)\n- [csv manual ($*)]($*/csv.md)\n- [timeclock manual ($*)]($*/timeclock.md)\n- [timedot manual ($*)]($*/timedot.md)%ms" src/SUMMARY.md 
	@mdbook build && mkdir -p out2 && cp -r out/$* out2
	@# Preserve hashed assets so they survive the next mdbook build (which deletes out/)
	@mkdir -p out2/.assets out2/.assets/css out2/.assets/fonts out2/.assets/js && \
	 cp -n out/*-*.js out/*-*.min.js out/*-*.css 2>/dev/null out2/.assets/ || true; \
	 cp -n out/css/*-*.css 2>/dev/null out2/.assets/css/ || true; \
	 cp -n out/fonts/*-*.css 2>/dev/null out2/.assets/fonts/ || true; \
	 cp -n out/js/*-*.js 2>/dev/null out2/.assets/js/ || true
	@git checkout -- theme/index.hbs src/SUMMARY.md

# Generate sitemap.xml, after copying the old manuals under out/ temporarily.
#	@echo "building sitemap.xml"
sitemap:
	@for d in out2/*; do cp $$d/* out/`basename $$d`; done
	@python3 sitemap.py -b https://hledger.org -r out/

# Regenerate the sponsor avatars in src/sponsor.md from the Open Collective API.
sponsors:
	@./update-sponsors.sh

# Restore hashed assets (JS/CSS) from all mdbook builds into out/,
# so older manual versions' relative ../asset references don't 404.
restore-assets:
	@if [ -d out2/.assets ]; then cp -rn out2/.assets/* out/ 2>/dev/null; fi || true

clean:
	mdbook clean

# The following rules run `mdbook build` in a loop, which does not render the site completely:
# - sidebar manual links will be without versions.
# Manually running `make build` after it starts will fix these.

# Run `mdbook serve` which renders the pages and serves them on http port 3000.
serve:
	mdbook serve

# Auto-rebuild site when source files change (mdbook watch/serve should but usually don't).
watch:
	watchexec -w src -w ../doc -w css -w js -- mdbook build

keepwatching:
	while true; do make -s watch; done

# Auto-rebuild site and auto-reload browser, since mdbook serve doesn't seem to yet.
# XXX dies
# LIVERELOADPORT=3001
# LIVERELOAD=livereloadx -p $(LIVERELOADPORT) -s \
# 	--exclude '*.html'
#   # don't reload as every page is generated, wait till the static files get copied
# OUT=out
# BROWSE=open
# reload:
# 	make watch &
# 	(sleep 1; $(BROWSE) http://localhost:$(LIVERELOADPORT)/) &
# 	$(LIVERELOAD) $(OUT)

MANUALS=\
	../hledger/hledger.md \
	../hledger-ui/hledger-ui.md \
	../hledger-web/hledger-web.md \

# Create (or update) a snapshot of the VER release manuals, in src/VER/hledger*.
# These will be copied from the main repo in the parent directory, which should be clean.
# It will be switched to the `VER-branch` branch (and left there).
# The commit message will include the main repo's current git hash, FWIW.
snapshot-%:
	git -C .. checkout $*-branch && \
	(cd ..; ./Shake webmanuals) && \
	mkdir -p src/$* && \
	for f in $(MANUALS); do test -e $$f && cp $$f src/$*; done && \
	git add src/$* \
		&& git commit -m "snapshot of $* manuals (`git -C .. show-ref heads/main -s9`)" src/$* \
		&& echo "Site manuals snapshot updated. If it's a new version, please add to site.js, Makefile, hledger.org.caddy" \
		|| [[ $$? == 1 ]]  # ignore "nothing to commit"

# Run this after mdbook build/serve to make old manuals visible via symlinks.
# These will be wiped by the next mdbook build/serve.
# (On production, webserver redirects are used instead.)
manualsymlinks:
	for d in out/1* out/dev; do (cd out; rm -rf `basename $$d`; ln -s ../out2/`basename $$d`); done

# Show which urls have been indexed for site search
searchurls:
	cat out/searchindex.json | jq .doc_urls

# caddy reload has stopped working some time in 2023
caddy-reload: caddy-validate
	systemctl reload caddy

# XXX invalid config doesn't stop it stopping the service
caddy-restart: caddy-validate
	systemctl stop caddy; systemctl start caddy

caddy-check caddy-validate:
	caddy validate --config hledger.org.caddy --adapter caddyfile && echo ok || echo FAILED
	@echo "Please also check recent caddy log for successful tls certificate renewals."
#
# Example of failing tls renewal:
#
# Nov 12 06:37:45 localhost caddy[919721]: {"level":"info","ts":1699807065.9162648,"logger":"tls.renew","msg":"renewing certificate","identifier":"hledger.org","remaining":1854818.083736637}
#
# Nov 12 06:37:46 localhost caddy[919721]: {"level":"info","ts":1699807066.05752,"logger":"http.acme_client","msg":"trying to solve challenge","identifier":"hledger.org","challenge_type":"dns-01","ca":"https://acme-staging-v02.api.letsencrypt.org/directory"}
#
# Nov 12 06:37:46 localhost caddy[919721]: {"level":"error","ts":1699807066.128025,"logger":"http.acme_client","msg":"cleaning up solver","identifier":"hledger.org","challenge_type":"dns-01","error":"no memory of presenting a DNS record for \"_acme-challenge.hledger.org\" (usually OK if presenting also failed)"}
#
# Nov 12 06:37:46 localhost caddy[919721]: {"level":"error","ts":1699807066.1968174,"logger":"tls.renew","msg":"could not get certificate from issuer","identifier":"hledger.org","issuer":"acme-v02.api.letsencrypt.org-directory","error":"[hledger.org] solving challenges: presenting for challenge: adding temporary record for zone \"hledger.org.\": got error status: HTTP 400: [{Code:6003 Message:Invalid request headers}] (order=https://acme-staging-v02.api.letsencrypt.org/acme/order/122973774/12216261964) (ca=https://acme-staging-v02.api.letsencrypt.org/directory)"}
#
# Nov 12 06:37:47 localhost caddy[919721]: {"level":"info","ts":1699807067.8907216,"logger":"http.acme_client","msg":"trying to solve challenge","identifier":"hledger.org","challenge_type":"dns-01","ca":"https://acme.zerossl.com/v2/DV90"}
#
# Nov 12 06:37:47 localhost caddy[919721]: {"level":"error","ts":1699807067.9423175,"logger":"http.acme_client","msg":"cleaning up solver","identifier":"hledger.org","challenge_type":"dns-01","error":"no memory of presenting a DNS record for \"_acme-challenge.hledger.org\" (usually OK if presenting also failed)"}
#
# Nov 12 06:37:48 localhost caddy[919721]: {"level":"error","ts":1699807068.3094556,"logger":"tls.renew","msg":"could not get certificate from issuer","identifier":"hledger.org","issuer":"acme.zerossl.com-v2-DV90","error":"[hledger.org] solving challenges: presenting for challenge: adding temporary record for zone \"hledger.org.\": got error status: HTTP 400: [{Code:6003 Message:Invalid request headers}] (order=https://acme.zerossl.com/v2/DV90/order/QpS9X34NIJlYngioKkRKhw) (ca=https://acme.zerossl.com/v2/DV90)"}
#
# Nov 12 06:37:48 localhost caddy[919721]: {"level":"error","ts":1699807068.3095212,"logger":"tls.renew","msg":"will retry","error":"[hledger.org] Renew: [hledger.org] solving challenges: presenting for challenge: adding temporary record for zone \"hledger.org.\": got error status: HTTP 400: [{Code:6003 Message:Invalid request headers}] (order=https://acme.zerossl.com/v2/DV90/order/QpS9X34NIJlYngioKkRKhw) (ca=https://acme.zerossl.com/v2/DV90)","attempt":4,"retrying_in":300,"elapsed":313.10931297,"max_duration":2592000}

caddy-fmt:
	caddy fmt hledger.org.caddy

# hledger.org deploy webhook
WEBHOOK_MANAGE_URL=https://github.com/hledgerorg/hledger_site/settings/hooks/134395816

webhook-settings:
	@echo $(WEBHOOK_MANAGE_URL)?tab=settings
	@open $(WEBHOOK_MANAGE_URL)?tab=settings

webhook-deliveries:
	@echo $(WEBHOOK_MANAGE_URL)?tab=deliveries
	@open $(WEBHOOK_MANAGE_URL)?tab=deliveries

