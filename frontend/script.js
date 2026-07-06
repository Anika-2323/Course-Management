// Student Course Management — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  // Generic form submit handler: shows an in-page notice instead of
  // actually posting anywhere (no backend wired up yet).
  document.querySelectorAll('form[data-mock-submit]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const notice = form.querySelector('.notice');
      if (!notice) return;

      notice.classList.remove('error');
      notice.classList.add('success', 'show');
      notice.textContent = form.dataset.successMessage || 'Submitted successfully.';

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Please wait…';
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = original;
        }, 1200);
      }
    });
  });

  // Department select: keep placeholder option styled until a real
  // value is chosen.
  document.querySelectorAll('select[data-placeholder-select]').forEach((select) => {
    const update = () => {
      select.style.color = select.value ? 'var(--charcoal)' : 'rgba(42,38,32,0.45)';
    };
    select.addEventListener('change', update);
    update();
  });

});