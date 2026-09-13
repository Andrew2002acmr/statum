# Premium pilot — точные запросы

Использован встроенный `image_gen`; metadata результатов: `gpt-image`, version `2.0`. Ровно 5 вызовов. Каждый входной файл передан инструменту через `referenced_image_paths`; исходники просмотрены в полном размере до вызовов. Подписи статуса ниже не являются частью изображений.

## 01-hero-a-initial

- Тип: interior-visualization
- Результат: `visualizations/hero-a-graphite-living-v1.png`
- Статус: reserve-no-copy-space
- Входные файлы: `design/img/IMG_20220801_164013.jpg`, `src/assets/images/hero/hero-main.png`

```text
Use case: ads-marketing / photorealistic-natural.
Create ONE premium residential interior advertising visualization, landscape 16:9 around 2048x1152. It is explicitly a fictional furnishing concept based on supplied actual room, NOT a documentary completed-work photograph. No text, logos, watermarks or UI in pixels.
Image 1 is the actual room and primary architectural reference: left window with radiator, long warm oak slat wall with large pale textured plaster inset, two black up/down sconces to the right of inset, oak floor, black ceiling track. Image 2 is an older prepared interpretation, only supporting reference for curtains and completed media wall, do not reproduce its sterile empty-room appearance.
Scene A: a restrained, inhabited high-end apartment living room, oak and graphite with subtle slate-blue accents. Develop a coherent furnished living room from this architecture. Pull camera back to include usable foreground depth, a low tailored graphite woven-fabric three-seat sofa facing the media wall, its near end visible lower left; a modest dark honed-stone coffee table on a charcoal/grey wool rug, a single reading book and unglazed ceramic cup. Slim wall-mounted television centered on plaster inset with a low oak media console beneath; correctly aligned and plausible sizes, no cables. Soft grey linen curtains at the existing left window; retain believable radiator ventilation and circulation behind sofa, clear 80–90 cm walkway. Furniture should be functional, not scattered showroom props. No gold ornaments.
Composition: professional editorial architecture photograph at 1.35 m height, corrected verticals, a natural 28–32 mm lens, carefully balanced depth. Recognizable slat/inset/sconce wall occupies middle and right two-thirds. Quiet shaded curtain/wall area with subdued texture in left 25–30% upper/middle portion suitable for a short future white headline and button; keep scene continuous, no painted black rectangle or embedded gradient, no typography. Interior remains the main content.
Lighting: credible soft overcast daylight from left window; warm sconces very subtle, restrained nonblown highlights, accurate soft contact shadows and glass reflections. Premium but real photography, oak with individual grain, visible woven cloth, slightly irregular textile folds and softly worn leather if any; natural dynamic range, no HDR, no waxy/plastic surfaces, no CGI sheen, no excessive beige. Remove photographer finger, loose packaging and protective window stickers for this explicitly fictional finished concept. Keep believable apartment scale; no extra panoramic windows, giant loft, impossible doorways or additional light strips. Produce a convincing photograph-like visualization, not an architectural 3D render.
```

## 02-hero-b

- Тип: interior-visualization
- Результат: `visualizations/hero-b-olive-reading.png`
- Статус: pilot-for-direction-choice
- Входные файлы: `design/img/IMG_20220801_164013.jpg`

```text
Use case: ads-marketing / photorealistic-natural.
Create ONE landscape 16:9 premium apartment interior visualization based on the supplied actual room photograph. This is an explicitly fictional advertising furnishing concept, never a portfolio photo. Aim for an architectural editorial photograph, not glossy CGI. No text, branding, graphic overlays, frame, or watermark.
Input image 1 is the source room: oak slat wall with pale plaster inset, two black wall sconces on the right, left window and radiator, oak plank floor, black ceiling track. Preserve its recognizable architectural identity but you may recompose the camera and furnish it thoughtfully.
Scene B: a calm contemporary reading and conversation room with forest-olive woven-wool sofa and a single saddle-tan leather reading chair, no television. Place the sofa against the broad plaster inset, facing toward the camera and a low oval dark walnut coffee table with one book. The chair is on the right, angled toward the sofa, useful clear walkways around both; no furniture blocking the left window/radiator. One simple framed abstract ink drawing on the plaster, sized with restraint, no text. Cool off-white mineral plaster, honey oak slats/floor, forest green upholstery, aged tan leather, neutral grey flatwoven rug. No gratuitous golden decor, no all-beige room, no stone podiums, no plants in every corner, no random decorative bowls. Organic subtle wrinkles in cushions, visible wood pores and cloth weave.
Composition and functional website use: take camera farther back and slightly left, near-level 32mm architecture photograph. The furnished interior is the main visual content, occupying the right 65–70%. The left 28–32% should be a real quiet graphite-grey plaster foreground return wall or deeply shaded flat linen curtain, almost free of objects, sufficiently low contrast for future white headline/button. Do NOT place a bright window, painting, plant, sofa back, or busy slats into this left headline area. The left quiet area is part of the physical room, not an artificial black gradient or flat graphic blank. Existing window provides side light from left-center, partially seen beyond the foreground return wall. Show believable room depth and apartment size, no expanded mansion.
Lighting: soft north-facing daylight, neutral luminous highlights, cool olive/grey atmosphere, only a faint 3000K accent from the two existing sconces. No orange bath, no extra LED strips, no overexposure, no HDR outlines. Genuine photographic surface response, measured local contrast, shadows and contact under furniture physically aligned with window light. Straight credible wall corners and furniture legs; coherent reflection direction. Premium calm and inviting, lived-in not showroom-perfect.
```

## 03-documentary-attempt-v1

- Тип: attempted-documentary-retouch
- Результат: `rejected/bathroom-retouch-v1.png`
- Статус: rejected-documentary-fidelity
- Входные файлы: `design/img/IMG_20220801_154610.jpg`

```text
Use case: precise-object-edit / lighting-weather.
Input image 1 is the EDIT TARGET: an actual completed bathroom photographed on a phone. Produce ONE professionally retouched documentary photograph of EXACTLY this bathroom. This is for a contractor's real portfolio, not a redesign or advertising furnishing visualization.
Keep the original portrait composition and complete field of view, native narrow portrait aspect around 9:16. Apply global perspective correction to near-vertical edges, without changing any object's shape or proportions. This must be visibly polished architectural photo retouching, not merely a smaller WebP export.
Allowed changes: neutralize blue/cyan/green phone color casts to natural neutral-grey tile, clean white ceramic and warm natural oak; refine exposure with controlled local contrast; reduce flare halos around the two real ceiling lights, keeping their true glow; subtly lift dark tile shadows without flattening the image; remove chromatic fringing and phone noise, gently recover believable microcontrast without invented texture or sharpening halos. Retouch ONLY the small loose yellow/brown packing-tape roll at the bottom of the vertical oak shelf. Improve photographic clarity and light separation substantially while retaining natural ambient light from the existing ceiling fixtures and doorway; no fake sunlight or new light source.
Mandatory exact invariants: keep the grey wall tile shapes, precise grid and irregular stone-like mottling, ALL original tile seams and their real alignments, bathtub dimensions/rim, the tiled bathtub front, the partial toilet at bottom left, basin and dark drain stopper, oak vanity and black handles, black tap behind basin, slim vertical oak shelf and its three dividers/four compartments, shower hardware at left/top, ceiling and the dark horizontal strip at its front boundary, floor tile layout, wall projection and cutouts to right of tub. Keep real silicone joints, edge unevenness, construction imperfections, visible scuffs and unresolved installation details as they are: do not cosmetically repair workmanship. Do not hide them behind props or change the crop to erase them. Preserve real reflection directions and small distinctive irregularities in surfaces.
No new towels, furniture, toiletries, plants, windows, niches, taps, shower screens, mirrors, lamps or decor. No reconstructed seams, no replacement tiles, no smoothing plaster/tile to new material, no material enhancement that misrepresents workmanship. Avoid synthetic perfection, glossy CGI, exaggerated HDR, cool steel-blue filter, uniformly beige grading, plastic texture and overly crisp edges.
Output should remain recognizably the same real photo with excellent professional retouch, no text, logos, watermark, framing, side-by-side layout or canvas extension.
```

## 04-hero-a-final

- Тип: interior-visualization
- Результат: `visualizations/hero-a-graphite-living.png`
- Статус: pilot-for-direction-choice
- Входные файлы: `design/premium-pilot/visualizations/hero-a-graphite-living-v1.png`

```text
Use case: precise-object-edit.
Image 1 is the edit target, an already generated advertising interior visualization. It is NOT a documentary photo. Make ONE precise composition refinement for a website Hero, retain landscape 16:9.
Keep the same graphite/slate sofa foreground, dark stone coffee table, oak media wall, television, console, two sconces, radiator, seating, grain and weave, realistic reflected window in TV, natural room scale and existing light. Do not redesign, rearrange or add decorations in the room's center and right.
Refine ONLY the left side for headline space: replace the far-left picture/plants/busy foreground at the leftmost 27% with a continuous real graphite plaster foreground return wall, slightly out of focus in natural shadow. This wall stops around 28% across the image; the existing window is seen beyond it in the left-center, with no change to the window design or number. The whole leftmost 26% from top to bottom should be visually quiet, physically believable dark matte plaster, without furniture, art or plants crossing it; this is an actual foreground architectural occlusion, NOT a graphic overlay, gradient or translucent black panel. Preserve the interior as the main 70+% subject, including enough sofa to read as a living room. The shaded wall must carry subtle natural tonal variation. Reduce the number of decorative foliage arrangements in visible remaining scene to just one on the coffee table. No text, logos, watermarks or UI. Maintain photorealistic editorial architectural photography: natural daylight, restrained local sconces, no HDR, no 3D-render sheen.
```

## 05-documentary-attempt-v2

- Тип: attempted-documentary-retouch
- Результат: `rejected/bathroom-retouch-v2.png`
- Статус: rejected-documentary-fidelity
- Входные файлы: `design/img/IMG_20220801_154610.jpg`

```text
Use case: precise-object-edit.
Retouch the ATTACHED ORIGINAL PHONE PHOTOGRAPH itself. Do NOT redraw this bathroom and do NOT recreate an idealized version. One narrow portrait output, same composition and same field of view as source, no extensions.
Absolute priority is documentary fidelity at the pixel/detail level, even if the result stays less polished than a render. Preserve the exact existing soft irregular streaky grey tile pattern, all grout lines in their original positions and widths, the white bathtub/basin curves, toilet fragment, oak cabinet and shelf edges, black tap, shower head and plumbing, ceiling boundary strip and its rough edges, ALL real joint irregularities, wall cutouts and finish defects. Leave original grain or blur wherever accurate sharpening is impossible. Do not invent detail inside the blown-out ceiling lights: keep softly blown highlights rather than creating neat round spotlights. Do not replace the tile texture with granular stone/marble. Do not improve the workmanship.
Apply a professional restrained local photographic retouch: correct the cyan/green cast to neutral greys while keeping oak naturally warm, control the broad glare from lamps without recreating fixtures, refine midtone light separation and reduce chromatic phone noise, subtly lift shadows. Perspective correction only if it can be a single global transform; otherwise retain the original viewpoint and edge slant. Preserve surface reflectance and contact shadows.
One tiny object removal only: erase the loose packing-tape roll in the very bottom compartment of the vertical oak shelf. Fill only its immediate footprint with matching nearby shelf/background, no other shelf alteration.
No new furniture/decor/equipment/towels, no erased construction scuffs, no repaired joints, no new materials or lamp designs, no architectural changes. No automatic beautification. Keep original real materials and worn/irregular qualities. Noticeably better color and light, exact same real object. No text, logo or side-by-side layout.
```
