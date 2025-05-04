type TMeta = {
	created_at?: Date;
	created_by?: number;
	updated_at: Date;
	updated_by: number;
};

export class BaseService {
	protected withMeta<T>(
		data: T,
		userId: number,
		isUpdate: boolean,
	): T & TMeta {
		const timestamp = new Date();
		const baseMeta: TMeta = {
			created_at: timestamp,
			created_by: userId,
			updated_at: timestamp,
			updated_by: userId,
		};

		if (!isUpdate) {
			delete baseMeta.created_by;
			delete baseMeta.created_at;
		}

		return {
			...data,
			...baseMeta,
		};
	}
}
