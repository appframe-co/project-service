import Counter from '@/models/counter.model';

export async function getNextSequence(name:string) {
    try {
        const ret = await Counter.findOneAndUpdate(
            { _id: name },
            { $inc: { seq: 1 } },
            { new: true, upsert: true}
        );

        return ret.seq;
    } catch(e) {
        return null;   
    }
}