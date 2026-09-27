import { contact } from '@/content/site';
import { Accent, ExtLink, Folio } from './primitives';

const Contact = () => (
  <section id="contact" aria-labelledby="contact-h" className="section-pad gutter pt-0">
    <div className="frame page-grid">
      <Folio num="06">Contact</Folio>
      <h2 id="contact-h" className="h2 max-w-[22ch]">
        <Accent {...contact.heading} />
      </h2>
      <p className="readable">{contact.body}</p>

      <ul className="kv">
        {contact.links.map((l) => (
          <li key={l.key}>
            <ExtLink href={l.href} className="kv-row">
              <span className="kv-key">{l.key}</span>
              <span className="kv-val">{l.value}</span>
            </ExtLink>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
