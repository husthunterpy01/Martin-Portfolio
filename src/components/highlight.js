import React from 'react';

// Wraps the numbers that carry a claim (percentages, "500+", "over 1000",
// "38 ATS sources") in <mark> so a skim of any bullet list lands on the metrics.
const METRIC =
  /(\d+(?:\.\d+)?%(?:\s+to\s+(?:above\s+)?\d+(?:\.\d+)?%\+?)?|\b\d[\d,]*\+|\b(?:over|about|across)\s+\d[\d,]*(?:\s+(?:postings|machines|users))?|~\d+(?:\.\d+)?%|\b\d+\s+(?:ATS sources|machines|views|concurrent users))/gi;

export default function highlight(text) {
  if (typeof text !== 'string') return text;
  const out = [];
  let last = 0;
  text.replace(METRIC, (match, _g, offset) => {
    if (offset > last) out.push(text.slice(last, offset));
    out.push(
      <mark className="metric" key={offset}>
        {match}
      </mark>
    );
    last = offset + match.length;
    return match;
  });
  if (last < text.length) out.push(text.slice(last));
  return out;
}
