export function calculateBill(startReading, endReading, days = 60, fixedCharges = 50, gstRate = 0.18) {
  const totalVolume = Math.max(0, endReading - startReading);
  const dailyAverage = totalVolume / days;

  // Slabs configuration (per day)
  const SLAB_1_LIMIT = 0.59;
  const SLAB_2_LIMIT = 1.49;
  
  const RATE_1 = 21.96;
  const RATE_2 = 26.01;
  const RATE_3 = 33.36;

  let slab1_scm = 0;
  let slab2_scm = 0;
  let slab3_scm = 0;

  if (dailyAverage <= SLAB_1_LIMIT) {
    slab1_scm = dailyAverage * days;
  } else if (dailyAverage <= SLAB_2_LIMIT) {
    slab1_scm = SLAB_1_LIMIT * days;
    slab2_scm = (dailyAverage - SLAB_1_LIMIT) * days;
  } else {
    slab1_scm = SLAB_1_LIMIT * days;
    slab2_scm = (SLAB_2_LIMIT - SLAB_1_LIMIT) * days;
    slab3_scm = (dailyAverage - SLAB_2_LIMIT) * days;
  }

  // Handle minor floating point inaccuracies
  slab1_scm = Math.round(slab1_scm * 100) / 100;
  slab2_scm = Math.round(slab2_scm * 100) / 100;
  slab3_scm = Math.round(slab3_scm * 100) / 100;

  const amount1 = slab1_scm * RATE_1;
  const amount2 = slab2_scm * RATE_2;
  const amount3 = slab3_scm * RATE_3;

  const totalConsumptionAmount = amount1 + amount2 + amount3;
  const gstAmount = (totalConsumptionAmount + fixedCharges) * gstRate;
  const netPayable = totalConsumptionAmount + fixedCharges + gstAmount;

  return {
    totalVolume: Math.round(totalVolume * 100) / 100,
    dailyAverage: Math.round(dailyAverage * 100) / 100,
    slab1: { units: slab1_scm, rate: RATE_1, amount: Math.round(amount1 * 100) / 100 },
    slab2: { units: slab2_scm, rate: RATE_2, amount: Math.round(amount2 * 100) / 100 },
    slab3: { units: slab3_scm, rate: RATE_3, amount: Math.round(amount3 * 100) / 100 },
    fixedCharges: fixedCharges,
    gstAmount: Math.round(gstAmount * 100) / 100,
    netPayable: Math.round(netPayable * 100) / 100
  };
}
